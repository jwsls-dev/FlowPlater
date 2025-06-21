/**
 * @module CartPlugin
 * @description Plugin for managing shopping cart functionality in FlowPlater
 */

import { AttributeMatcher } from "../dom/AttributeMatcher";
import { DEFAULTS, withDefault } from "../core/DefaultConfig";
import currency from "currency.js";

declare const FlowPlater: any;

/**
 * Cart plugin for FlowPlater that handles shopping cart operations
 *
 * @function CartPlugin
 * @returns {Object} Plugin object containing configuration, state, methods, hooks, and helpers
 */
const CartPlugin = (customConfig = {}) => {
  // <<< Configure storage early when plugin function is executed >>>
  // This ensures storage is enabled before GroupManager might need it.
  FlowPlater.config({
    storage: {
      enabled: true,
    },
  });
  FlowPlater.log(
    FlowPlater.logLevels.INFO,
    "[CartPlugin] Early config executed: Storage enabled.",
  );

  const config = {
    name: "cart",
    enabled: DEFAULTS.CART.ENABLED,
    priority: DEFAULTS.CART.PRIORITY,
    version: DEFAULTS.PLUGINS.DEFAULT_VERSION,
    dependencies: ["data-extractor"],
    optionalDependencies: [],
    settings: {
      debug: DEFAULTS.PLUGINS.DEBUG,
      dataAttribute: DEFAULTS.CART.DATA_ATTRIBUTE,
      group: DEFAULTS.CART.GROUP_NAME,
      requiredKeys: DEFAULTS.CART.REQUIRED_KEYS,
    },
    description: "Shopping cart functionality for FlowPlater",
    author: "FlowPlater Team",
    currency: {
      name: DEFAULTS.CART.CURRENCY.NAME,
      symbol: DEFAULTS.CART.CURRENCY.SYMBOL,
      precision: DEFAULTS.CART.CURRENCY.PRECISION,
      separator: DEFAULTS.CART.CURRENCY.SEPARATOR,
      decimal: DEFAULTS.CART.CURRENCY.DECIMAL,
      ...(customConfig as any).currency,
    },
    taxRates: DEFAULTS.CART.TAX_RATES,
    locale: withDefault((customConfig as any).locale, DEFAULTS.CART.LOCALE),
  };

  Object.assign(config, customConfig);

  // --- Helper function to generate Composite Cart Item ID ---
  const _generateCartItemId = (productData: any, actionElement: any) => {
    const baseId = productData?.id;
    if (baseId === undefined || baseId === null) {
      FlowPlater.log(
        FlowPlater.logLevels.ERROR,
        "[CartPlugin] Cannot generate cart item ID: Base product ID is missing.",
        productData,
      );
      return null; // Cannot generate ID without base ID
    }

    // Use _getRawAttribute to reliably get the variant key attribute
    const variantKeyAttr = actionElement
      ? AttributeMatcher._getRawAttribute(
          actionElement,
          "cart-variant-key",
          null,
        )
      : null;
    if (!variantKeyAttr) {
      return baseId.toString(); // No variant keys, use base ID
    }

    const variantKeys = variantKeyAttr
      .split(",")
      .map((k) => k.trim())
      .sort();
    if (variantKeys.length === 0) {
      return baseId.toString(); // Empty variant keys, use base ID
    }

    const variantParts = [];
    let hasAnyValue = false;

    for (const key of variantKeys) {
      // Skip if key is not in product data - this is expected for unselected variants
      if (!productData.hasOwnProperty(key)) {
        continue;
      }

      const value = productData[key];
      // Only include the variant if it has a valid value
      if (value !== null && value !== undefined && value !== "") {
        hasAnyValue = true;
        // Ensure value is suitable for ID (string/number)
        if (typeof value === "string" || typeof value === "number") {
          variantParts.push(
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
          );
        } else {
          FlowPlater.log(
            FlowPlater.logLevels.WARN,
            `[CartPlugin] Variant key '${key}' has non-primitive value, skipping for ID generation:`,
            value,
          );
        }
      }
    }

    // If no variants had values, just return the base ID
    // This handles the case where all variants are unselected
    if (!hasAnyValue) {
      return baseId.toString();
    }

    return `${baseId}::${variantParts.join(";")}`;
  };
  // --- End Helper ---

  const state = {
    cart: {
      items: new Map(), // Store items by ID for quick lookup
      totalItems: 0,
      totalPrice: 0,
      totalDiscount: 0,
      totalTax: 0,
      totalAmount: 0,
      totalItemsFmt: "",
      totalPriceFmt: "",
      totalDiscountFmt: "",
      totalTaxFmt: "",
      totalAmountFmt: "",
    },
    observers: new Map(), // Store MutationObservers for product elements
  };

  // Move updateAllProductStates above updateCartTotals so it is defined before use
  const updateAllProductStates = () => {
    const elements = AttributeMatcher.findMatchingElements(
      "data",
      config.settings.dataAttribute,
    );
    (Array.isArray(elements) ? elements : elements ? [elements] : []).forEach((productElement: any) => {
      // Skip button state management for cart items
      if (productElement.closest(`[fp-group="${config.settings.group}"]`)) {
        return;
      }

      const productData = processHtml(productElement);
      if (!productData) return;

      const addButton = productElement.querySelector("[fp-cart-add]");
      const cartItemId = _generateCartItemId(productData, addButton);
      const cartItem = state.cart.items.get(cartItemId);
      const amountInput = productElement.querySelector("[fp-cart-item-amount]");
      const removeButton = productElement.querySelector("[fp-cart-remove]");

      const currentAmount = cartItem?.amount || 0;
      const stock =
        productData.stock === undefined || productData.stock === null
          ? Infinity
          : productData.stock;

      // Get total amount across all variants
      const totalInCart = getTotalAmountForProduct(productData.id);

      // Check if we've reached max stock across all variants
      const atMaxStock = totalInCart >= stock;
      const atMinStock = currentAmount <= 0;

      if (amountInput) {
        amountInput.value = currentAmount;
        amountInput.min = "0";
        // Max amount should be remaining stock plus current amount
        const remainingStock = Math.max(
          0,
          stock - (totalInCart - currentAmount),
        );
        amountInput.max = remainingStock;
      }

      if (addButton) {
        // Special case: if stock is 1 and a different variant is in the cart, allow add (for replacement)
        let disableAdd = atMaxStock;
        if (stock === 1 && totalInCart === 1) {
          // Check if the item in the cart is a different variant
          const baseId = productData.id?.toString();
          const cartHasDifferentVariant = Array.from(
            state.cart.items.keys(),
          ).some((id) => id.split("::")[0] === baseId && id !== cartItemId);
          if (cartHasDifferentVariant) {
            disableAdd = false;
          }
        }
        addButton.disabled = disableAdd;
        // Toggle fp-disabled class
        if (addButton.disabled) {
          addButton.classList.add("fp-disabled");
        } else {
          addButton.classList.remove("fp-disabled");
        }
      }

      // --- NEW: Show remove button for baseId (no variant) items ---
      if (removeButton) {
        let showRemove = !atMinStock;
        // If the cart contains a baseId-only item (no variant), and this product has no variant selected, show remove
        const hasBaseIdOnly = state.cart.items.has(productData.id?.toString());
        // Check if this product element has no variant selected (cartItemId === baseId)
        const isBaseIdOnly = cartItemId === productData.id?.toString();
        if (hasBaseIdOnly && isBaseIdOnly) {
          showRemove = true;
        }
        removeButton.disabled = !showRemove;
        if (!showRemove) {
          removeButton.classList.add("fp-disabled");
        } else {
          removeButton.classList.remove("fp-disabled");
        }
      }
    });
    // Broadcast product states updated
    FlowPlater.trigger("cart:productStatesUpdated", null, {});
  };

  // Ensure serializeCart and deserializeCart are defined here
  const serializeCart = () => {
    // Return items as an array of the map's values (item objects)
    const items = Array.from(state.cart.items.values()).map((item) => ({
      ...item,
      amountFmt: item.amountFmt,
      unitPriceFmt: item.unitPriceFmt,
      totalPriceFmt: item.totalPriceFmt,
      discountFmt: item.discountFmt,
      totalDiscountFmt: item.totalDiscountFmt,
      taxFmt: item.taxFmt,
    }));
    return {
      items,
      totalItems: state.cart.totalItems,
      totalItemsFmt: state.cart.totalItemsFmt,
      totalPrice: state.cart.totalPrice,
      totalPriceFmt: state.cart.totalPriceFmt,
      totalDiscount: state.cart.totalDiscount,
      totalDiscountFmt: state.cart.totalDiscountFmt,
      totalTax: state.cart.totalTax,
      totalTaxFmt: state.cart.totalTaxFmt,
      totalAmount: state.cart.totalAmount,
      totalAmountFmt: state.cart.totalAmountFmt,
    };
  };

  const deserializeCart = (data: any) => {
    // Reset state if data is null/undefined
    if (!data) {
      state.cart.items = new Map();
      state.cart.totalItems = 0;
      state.cart.totalPrice = 0;
      state.cart.totalDiscount = 0;
      state.cart.totalTax = 0;
      state.cart.totalAmount = 0;
      FlowPlater.log(
        FlowPlater.logLevels.DEBUG,
        "[CartPlugin] State reset in deserializeCart (no data).",
      );
      return;
    }

    // Rebuild the internal Map from the items array (if it exists and is an array)
    const newItemsMap = new Map();
    if (Array.isArray(data.items)) {
      data.items.forEach((item: any) => {
        // Use the stored composite cartItemId as the key
        if (item && item.cartItemId !== undefined) {
          newItemsMap.set(item.cartItemId, item);
        } else if (item && item.id !== undefined) {
          // Fallback for older data or items without variants? Generate ID?
          // For now, let's log a warning and potentially still use base id
          // or attempt to regenerate - regenerating is complex here.
          FlowPlater.log(
            FlowPlater.logLevels.WARN,
            "[CartPlugin] Cart item missing cartItemId during deserialization. Using base id as fallback key.",
            item,
          );
          newItemsMap.set(item.id, item); // Fallback, might cause issues with variants
        }
      });
    }
    state.cart.items = newItemsMap;

    // Set other totals from the loaded data
    state.cart.totalItems = data.totalItems || 0;
    state.cart.totalPrice = data.totalPrice || 0;
    state.cart.totalDiscount = data.totalDiscount || 0;
    state.cart.totalTax = data.totalTax || 0;
    state.cart.totalAmount = data.totalAmount || 0;

    FlowPlater.log(
      FlowPlater.logLevels.DEBUG,
      "[CartPlugin] State after deserializeCart:",
      state.cart,
    );
  };

  /**
   * Helper function to find product element from a target element
   * @param {HTMLElement} target - The target element to start searching from
   * @returns {HTMLElement|null} The found product element or null
   */
  const findProductElement = (target: any) => {
    let productElement = AttributeMatcher.findClosestParent(
      "data",
      target,
      config.settings.dataAttribute,
      true,
    );
    return productElement;
  };

  /**
   * Locale-aware price sanitizer using currency.js
   * @param {string|number} price
   * @returns {number}
   */
  function sanitizePrice(price: any) {
    if (typeof price === "number") return price;
    if (!price) return 0;
    let priceStr = price.toString().trim();
    // Remove currency symbols and whitespace
    priceStr = priceStr.replace(/[^\d.,\- ]/g, "");
    // Use currency.js to parse
    try {
      return currency(priceStr, {
        separator: config.currency.separator,
        decimal: config.currency.decimal,
      }).value;
    } catch (e) {
      return 0;
    }
  }

  /**
   * Calculate price with discount
   * @param {number} price - Original price
   * @param {string} discount - Discount value (e.g. "10%" or "5")
   * @returns {number} Final price after discount
   */
  const calculateDiscountedPrice = (price: any, discount: any) => {
    const sanitizedPrice = sanitizePrice(price);
    if (!discount) return sanitizedPrice;
    if (typeof discount === "string" && discount.endsWith("%")) {
      const percentage = parseFloat(discount) / 100;
      return sanitizedPrice * (1 - percentage);
    }
    return Math.max(0, sanitizedPrice - sanitizePrice(discount));
  };

  // Returns the amount in the cart for a given cartItemId
  const getCartItemAmount = (cartItemId: any) => {
    const item = state.cart.items.get(cartItemId);
    return item ? item.amount : 0;
  };

  /**
   * Get total amount in cart for all variants of a product
   * @param {string} baseId - Base product ID without variants
   * @returns {number} Total amount across all variants
   */
  const getTotalAmountForProduct = (baseId: any) => {
    let totalAmount = 0;
    state.cart.items.forEach((item) => {
      // Check if this item is a variant of the base product
      // Items will either be baseId or baseId::variants
      const itemBaseId = item.cartItemId.split("::")[0];
      if (itemBaseId === baseId.toString()) {
        totalAmount += item.amount;
      }
    });
    return totalAmount;
  };

  /**
   * Update cart totals
   */
  const updateCartTotals = () => {
    let totalItems = 0;
    let totalPrice = 0;
    let totalDiscount = 0;
    let totalTax = 0;
    let totalAmount = 0;

    const prevTotalItems = state.cart.totalItems;

    state.cart.items.forEach((item) => {
      totalItems += item.amount;
      const itemPrice = sanitizePrice(item.price) || 0;
      const itemDiscount = item.discount || "0";
      const discountedPrice = calculateDiscountedPrice(itemPrice, itemDiscount);
      const itemTotalWithoutTax = discountedPrice * item.amount;
      const itemTaxRate =
        config.taxRates.find(
          (rate) => rate.name.toLowerCase() === item.taxRate?.toLowerCase(),
        )?.value || config.taxRates[0].value;
      const itemTotalWithTax = itemTotalWithoutTax * itemTaxRate;

      totalPrice += itemPrice * item.amount;
      totalDiscount += (itemPrice - discountedPrice) * item.amount;
      totalTax += itemTotalWithTax - itemTotalWithoutTax;
    });

    // Update cart totals
    totalAmount = totalPrice - totalDiscount + totalTax;
    state.cart.totalItems = totalItems;
    state.cart.totalPrice = totalPrice;
    state.cart.totalDiscount = totalDiscount;
    state.cart.totalTax = totalTax;
    state.cart.totalAmount = totalAmount;

    // Set formatted values AFTER raw values are set
    state.cart.totalItemsFmt = state.cart.totalItems.toString();
    state.cart.totalPriceFmt = formatNumber(state.cart.totalPrice, {
      currencySymbol: config.currency.symbol,
    });
    state.cart.totalDiscountFmt = formatNumber(state.cart.totalDiscount, {
      currencySymbol: config.currency.symbol,
    });
    state.cart.totalTaxFmt = formatNumber(state.cart.totalTax, {
      currencySymbol: config.currency.symbol,
    });
    state.cart.totalAmountFmt = formatNumber(state.cart.totalAmount, {
      currencySymbol: config.currency.symbol,
    });

    // Update all product elements on the page that are NOT in the cart
    const elementsNotInCart = AttributeMatcher.findMatchingElements(
      "data",
      config.settings.dataAttribute,
    );
    (Array.isArray(elementsNotInCart) ? elementsNotInCart : elementsNotInCart ? [elementsNotInCart] : []).forEach((productElement: any) => {
      // Skip if this is a cart item
      if (productElement.closest(`[fp-group="${config.settings.group}"]`)) {
        // For cart items, store the cartItemId
        const productData = processHtml(productElement);
        if (productData) {
          const cartItem = Array.from(state.cart.items.values()).find(
            (item) =>
              item.id === productData.id &&
              (!item.cartItemId ||
                item.cartItemId ===
                  productElement.getAttribute("fp-cart-item-id")),
          );
          if (cartItem && cartItem.cartItemId) {
            productElement.setAttribute("fp-cart-item-id", cartItem.cartItemId);
          }
        }
        return;
      }

      const productData = processHtml(productElement);
      if (!productData) return;
      const addButton = productElement.querySelector("[fp-cart-add]");
      const removeButton = productElement.querySelector("[fp-cart-remove]");
      const amountInput = productElement.querySelector("[fp-cart-item-amount]");
      const cartItemId = _generateCartItemId(productData, addButton);
      const cartAmount = getCartItemAmount(cartItemId);
      const stock =
        productData.stock === undefined || productData.stock === null
          ? Infinity
          : productData.stock;
      const atMaxStock = cartAmount >= stock;
      const atMinStock = cartAmount <= 0;

      if (addButton) addButton.disabled = atMaxStock;
      if (removeButton) removeButton.disabled = atMinStock;
      if (amountInput) {
        amountInput.value = cartAmount;
        amountInput.min = "0";
        amountInput.max = stock;
      }
    });

    // Update display elements
    const cartTotalCountElements = AttributeMatcher.findMatchingElements("cart-total-count");
    (Array.isArray(cartTotalCountElements) ? cartTotalCountElements : cartTotalCountElements ? [cartTotalCountElements] : []).forEach((el: any) => {
      el.textContent = totalItems.toString();
    });
    const cartTotalPriceElements = AttributeMatcher.findMatchingElements("cart-total-price");
    (Array.isArray(cartTotalPriceElements) ? cartTotalPriceElements : cartTotalPriceElements ? [cartTotalPriceElements] : []).forEach((el: any) => {
      el.textContent = totalPrice.toFixed(2);
    });
    const cartTotalDiscountElements = AttributeMatcher.findMatchingElements("cart-total-discount");
    (Array.isArray(cartTotalDiscountElements) ? cartTotalDiscountElements : cartTotalDiscountElements ? [cartTotalDiscountElements] : []).forEach((el: any) => {
      el.textContent = totalDiscount.toFixed(2);
    });
    const cartTotalTaxElements = AttributeMatcher.findMatchingElements("cart-total-tax");
    (Array.isArray(cartTotalTaxElements) ? cartTotalTaxElements : cartTotalTaxElements ? [cartTotalTaxElements] : []).forEach((el: any) => {
      el.textContent = totalTax.toFixed(2);
    });
    const cartTotalAmountElements = AttributeMatcher.findMatchingElements("cart-total-amount");
    (Array.isArray(cartTotalAmountElements) ? cartTotalAmountElements : cartTotalAmountElements ? [cartTotalAmountElements] : []).forEach((el: any) => {
      el.textContent = totalAmount.toFixed(2);
    });

    const cartData = serializeCart();
    FlowPlater.updateGroup(config.settings.group, cartData);
    FlowPlater.trigger("cart:updated", null, { cart: state.cart });

    // Never disable remove buttons in cart
    document
      .querySelectorAll(
        `[fp-group="${config.settings.group}"] [fp-cart-remove]`,
      )
      .forEach((removeButton) => {
        (removeButton as HTMLButtonElement).disabled = false;
      });

    // At the end, update product element states
    updateAllProductStates();

    // Broadcast cart amount updated if item count changed
    if (prevTotalItems !== totalItems) {
      FlowPlater.trigger("cart:amountUpdated", null, {
        oldCount: prevTotalItems,
        newCount: totalItems,
      });
    }
  };

  function formatNumber(value: any, options: any = {}) {
    if (typeof value !== "number" || isNaN(value)) return "";
    return currency(value, {
      symbol:
        options.currencySymbol !== undefined
          ? options.currencySymbol
          : config.currency.symbol || "",
      separator: config.currency.separator,
      decimal: config.currency.decimal,
      precision:
        options.mantissa !== undefined
          ? options.mantissa
          : config.currency.precision,
    }).format();
  }

  /**
   * Add product to cart
   * @param {Object} product - Product data
   * @param {number} amount - Amount to add
   */
  const addToCart = (product: any, amount = 1, actionElement: HTMLElement | null = null) => {
    const missingFields = config.settings.requiredKeys
      .filter((key) => !(key in product))
      .join(", ");
    if (missingFields) {
      FlowPlater.log(
        FlowPlater.logLevels.ERROR,
        `[CartPlugin] Product missing required fields: ${missingFields}`,
      );
      return;
    }
    const cartItemId = _generateCartItemId(product, actionElement);
    if (!cartItemId) return;

    const existingItem = state.cart.items.get(cartItemId);
    const maxStock =
      product.stock === undefined || product.stock === null
        ? Infinity
        : product.stock;

    // Get total amount across all variants
    const totalInCart = getTotalAmountForProduct(product.id);

    // Special handling for stock of 1
    if (maxStock === 1 && totalInCart === 1 && !existingItem) {
      // Find the existing variant in cart
      let existingVariantId = null;
      // @ts-ignore
      state.cart.items.forEach((item, id) => {
        if (id.split("::")[0] === product.id.toString()) {
          existingVariantId = id;
        }
      });

      if (existingVariantId) {
        // Remove the existing variant
        const oldVariant = state.cart.items.get(existingVariantId);
        state.cart.items.delete(existingVariantId);

        // Add the new variant
        state.cart.items.set(cartItemId, {
          ...product,
          cartItemId: cartItemId,
          amount: 1,
          amountFmt: currency(1).format(),
          unitPrice: oldVariant.price,
          unitPriceFmt: formatNumber(oldVariant.price),
          totalPrice: oldVariant.price,
          totalPriceFmt: formatNumber(oldVariant.price),
          discount: oldVariant.discount,
          discountFmt: formatNumber(oldVariant.discount),
          totalDiscount: oldVariant.discount * 1,
          totalDiscountFmt: formatNumber(oldVariant.discount * 1),
          tax: oldVariant.tax,
          taxFmt: formatNumber(oldVariant.tax),
          taxRate: oldVariant.taxRate || config.taxRates[0].name,
        });

        FlowPlater.log(
          FlowPlater.logLevels.INFO,
          `[CartPlugin] Replaced variant ${existingVariantId} with ${cartItemId} (stock: 1)`,
        );

        // Trigger a custom event for variant replacement
        FlowPlater.trigger("cart:variantReplaced", null, {
          oldVariantId: existingVariantId,
          newVariantId: cartItemId,
          product: product,
        });

        updateCartTotals();
        return;
      }
    }

    // Calculate how many more we can add considering total across variants
    const remainingStock = Math.max(0, maxStock - totalInCart);

    if (existingItem) {
      const currentAmount = existingItem.amount;
      // Only allow adding up to remaining stock
      const newAmount = Math.min(
        currentAmount + amount,
        currentAmount + remainingStock,
      );
      if (newAmount === currentAmount) return; // No change possible
      existingItem.amount = newAmount;
    } else {
      // For new items, only allow adding up to remaining stock
      const initialAmount = Math.min(amount, remainingStock);
      if (initialAmount <= 0) return;
      const unitPrice = sanitizePrice(product.price) || 0;
      const discount = sanitizePrice(product.discount) || 0;
      const tax =
        config.taxRates.find(
          (rate) => rate.name.toLowerCase() === product.taxRate?.toLowerCase(),
        )?.value || config.taxRates[0].value;
      state.cart.items.set(cartItemId, {
        ...product,
        cartItemId: cartItemId,
        amount: initialAmount,
        amountFmt: initialAmount.toString(),
        unitPrice: unitPrice,
        unitPriceFmt: formatNumber(unitPrice),
        totalPrice: unitPrice * initialAmount,
        totalPriceFmt: formatNumber(unitPrice * initialAmount),
        discount: discount,
        discountFmt: formatNumber(discount),
        totalDiscount: discount * initialAmount as any,
        totalDiscountFmt: formatNumber(discount * initialAmount),
        tax: (unitPrice * initialAmount - discount * initialAmount) * (tax - 1) as any,
        taxFmt: formatNumber(
          (unitPrice * initialAmount - discount * initialAmount) * (tax - 1),
        ),
        taxRate: product.taxRate || config.taxRates[0].name,
      });
      // Broadcast product added
      FlowPlater.trigger("cart:productAdded", null, { product, cartItemId });
    }
    updateCartTotals();
  };

  /**
   * Remove product from cart
   * @param {string} productId - Product ID to remove
   */
  const removeFromCart = (productData: any, actionElement: HTMLElement | null = null) => {
    const cartItemId = _generateCartItemId(productData, actionElement);
    if (!cartItemId) return;
    state.cart.items.delete(cartItemId);
    // Broadcast product removed
    FlowPlater.trigger("cart:productRemoved", null, {
      productData,
      cartItemId,
    });
    updateCartTotals();
  };

  // --- Start of Variant Merging Logic (Moved from DataExtractor) ---
  const _performVariantMerge = (baseData: any) => {
    // Use settings directly from this plugin's config
    const settings = config.settings;
    const variantKey = (settings as any).variantKey || "variant"; // Use defaults if not set
    const variantIdKey = (settings as any).variantIdKey || "id";
    const variantSelectorKey =
      (settings as any).variantSelectorKey || "selected-variant";

    const variants = baseData[variantKey];
    const selectorValue = baseData[variantSelectorKey];

    // Check if variants array exists
    if (!Array.isArray(variants) || variants.length === 0) {
      // If no variants, just remove the selector key if it exists and return
      if (baseData.hasOwnProperty(variantSelectorKey)) {
        delete baseData[variantSelectorKey];
      }
      return baseData;
    }

    // Validate selector value (must be string or number)
    if (
      typeof selectorValue !== "string" &&
      typeof selectorValue !== "number"
    ) {
      FlowPlater.log(
        FlowPlater.logLevels.WARN,
        `[CartPlugin] Invalid or missing value for selector key '${variantSelectorKey}'. Expected string or number, got:`,
        selectorValue,
      );
      // Return base data without variants/selector key
      delete baseData[variantKey];
      if (baseData.hasOwnProperty(variantSelectorKey)) {
        delete baseData[variantSelectorKey];
      }
      return baseData;
    }

    // Find the selected variant
    const selectedVariant = variants.find(
      (variant) =>
        variant &&
        variant[variantIdKey]?.toString() === selectorValue.toString(),
    );

    if (!selectedVariant) {
      FlowPlater.log(
        FlowPlater.logLevels.WARN,
        `[CartPlugin] No variant found with ${variantIdKey} matching selector value:`,
        selectorValue,
      );
      // Return base data without variants/selector key
      delete baseData[variantKey];
      if (baseData.hasOwnProperty(variantSelectorKey)) {
        delete baseData[variantSelectorKey];
      }
      return baseData;
    }

    // Perform the merge
    const mergedData = { ...baseData }; // Start with base data
    delete mergedData[variantKey]; // Remove the variant array
    delete mergedData[variantSelectorKey]; // Remove the selector key

    // Merge selected variant properties, overwriting base properties
    Object.assign(mergedData, selectedVariant);

    FlowPlater.log(FlowPlater.logLevels.DEBUG, "[CartPlugin] Variant merged", {
      baseData,
      selectedVariant,
      mergedData,
    });

    return mergedData;
  };
  // --- End of Variant Merging Logic ---

  const processHtml = (html: any) => {
    FlowPlater.log(FlowPlater.logLevels.INFO, "Processing HTML", html);
    let productData = null;
    try {
      productData =
        FlowPlater.getPlugin("data-extractor").instanceMethods.extractData(
          html,
        );
    } catch (e) {
      FlowPlater.log(
        FlowPlater.logLevels.ERROR,
        "[CartPlugin] Failed to extract data using DataExtractorPlugin.",
        e,
      );
      return null; // Return null if extraction fails
    }

    if (!productData || Object.keys(productData).length === 0) {
      FlowPlater.log(
        FlowPlater.logLevels.WARN,
        "[CartPlugin] Data extraction yielded no data.",
        html,
      );
      return null;
    }

    // --- Unwrap data based on configured attribute ---
    // DataExtractor returns { [dataAttribute]: { ...actual data... } }
    // We want the inner object for cart operations.
    const dataToProcess =
      productData[config.settings.dataAttribute] || productData;
    // --- End Unwrap ---

    // Perform variant merge *after* initial extraction by DataExtractor
    // Pass the unwrapped data to the merge function
    const mergedData = _performVariantMerge(dataToProcess);

    return mergedData; // Return the potentially merged data
  };

  /**
   * Update product amount in cart
   * @param {string} productId - Product ID
   * @param {number} amount - New amount
   */
  const updateAmount = (productData: any, amount: any, actionElement: HTMLElement | null = null) => {
    const cartItemId = _generateCartItemId(productData, actionElement);
    if (!cartItemId) return;
    const item = state.cart.items.get(cartItemId);

    // If item doesn't exist, DO NOTHING (don't add it here)
    if (!item) {
      FlowPlater.log(
        FlowPlater.logLevels.DEBUG,
        `[CartPlugin] updateAmount called for non-existent item: ${cartItemId}. No action taken.`,
      );
      return;
    }

    // Item exists, proceed with update/remove logic
    const maxAmount =
      item.stock === undefined || item.stock === null ? Infinity : item.stock;
    const newAmount = Math.min(Math.max(0, amount), maxAmount);

    if (newAmount === 0) {
      FlowPlater.log(
        FlowPlater.logLevels.DEBUG,
        `[CartPlugin] updateAmount: Removing item ${cartItemId} (newAmount is 0).`,
      );
      removeFromCart(productData, actionElement as HTMLElement);
    } else if (newAmount !== item.amount) {
      FlowPlater.log(
        FlowPlater.logLevels.DEBUG,
        `[CartPlugin] updateAmount: Updating item ${cartItemId} from ${item.amount} to ${newAmount}.`,
      );
      item.amount = newAmount;
      updateCartTotals();
    } else {
      FlowPlater.log(
        FlowPlater.logLevels.DEBUG,
        `[CartPlugin] updateAmount: Item ${cartItemId} amount (${item.amount}) unchanged.`,
      );
    }
  };

  /**
   * Setup MutationObserver for product element
   * @param {HTMLElement} element - Product element to observe
   */
  const setupProductObserver = (element: any) => {
    if (state.observers.has(element)) return;

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          (mutation.type === "attributes" &&
            AttributeMatcher._attributeMatchesNormalizedName(
              mutation.attributeName as string,
              "data",
            )) ||
          (mutation.type === "characterData" &&
            AttributeMatcher._hasAttribute(
              mutation.target.parentElement as HTMLElement,
              "data",
            ))
        ) {
          const productData = processHtml(element);
          const cartItem = state.cart.items.get(productData.id);
          if (cartItem) {
            // Update cart item with new data
            Object.assign(cartItem, productData);
            updateCartTotals();
          }
        }
      }
    });

    observer.observe(element, {
      attributes: true,
      attributeFilter: AttributeMatcher._getAllAttributeNames("data"),
      characterData: true,
      subtree: true,
    });

    state.observers.set(element, observer);
  };

  const hooks = {
    /**
     * Called after FlowPlater has fully initialized
     */
    initComplete: function (flowplater: any) {
      const group = FlowPlater.getOrCreateGroup(config.settings.group, {});

      if (group && group.data) {
        FlowPlater.log(
          FlowPlater.logLevels.DEBUG,
          "[CartPlugin] Calling deserializeCart with group data:",
          group.data,
        );
        deserializeCart(group.data);
      } else {
        FlowPlater.log(
          FlowPlater.logLevels.WARN,
          "[CartPlugin] No group or group data found in initComplete.",
        );
        deserializeCart(null);
      }

      // --- NEW: Select first radio in each group if none selected ---
      const radioElements = AttributeMatcher.findMatchingElements(
        "data",
        config.settings.dataAttribute,
      );
      (Array.isArray(radioElements) ? radioElements : radioElements ? [radioElements] : []).forEach((productElement: any) => {
        // Find all radio inputs in this product
        const radios = Array.from(
          productElement.querySelectorAll('input[type="radio"]'),
        );
        // Group radios by name
        const radioGroups: any = {};
        radios.forEach((radio: any) => {
          if (!radio.name) return;
          if (!radioGroups[radio.name]) radioGroups[radio.name] = [];
          radioGroups[radio.name].push(radio);
        });
        // For each group, if none checked, check the first one
        Object.values(radioGroups).forEach((group: any) => {
          if (!group.some((radio: any) => radio.checked)) {
            group[0].checked = true;
          }
        });
      });
      // --- END NEW ---

      const setupCartEventListeners = () => {
        // Remove old direct event listeners if they exist
        document
          .querySelectorAll(
            "[fp-cart-add], [fp-cart-remove], [fp-cart-item-amount]",
          )
          .forEach((element) => {
            element.removeEventListener("click", handleCartClick);
            element.removeEventListener("change", handleCartChange);
            element.removeEventListener("input", handleCartInput);
          });

        // Add delegated event listeners to document
        document.removeEventListener("click", handleDelegatedClick);
        document.removeEventListener("change", handleDelegatedChange);
        document.removeEventListener("input", handleDelegatedInput);

        document.addEventListener("click", handleDelegatedClick);
        document.addEventListener("change", handleDelegatedChange);
        document.addEventListener("input", handleDelegatedInput);

        // Initialize input values/button states
        updateAllProductStates();
      };

      // Delegated event handlers
      const handleDelegatedClick = (e: any) => {
        const element = e.target.closest("[fp-cart-add], [fp-cart-remove]");
        if (!element) return;

        e.preventDefault();
        e.stopPropagation();

        const isAdd = element.hasAttribute("fp-cart-add");
        const isRemove = element.hasAttribute("fp-cart-remove");

        if (isAdd || isRemove) {
          const productElement = findProductElement(element);
          if (!productElement) return;

          // Check if this is a cart item
          const isInCart = productElement.closest(
            `[fp-group="${config.settings.group}"]`,
          );

          if (isRemove && isInCart) {
            // For cart items, first try to get the stored cartItemId
            let cartItemId = productElement.getAttribute(
              "fp-data-cart-item-id",
            );

            // If no stored cartItemId, try to generate one from the product data
            if (!cartItemId) {
              const productData = processHtml(productElement);
              if (productData) {
                // For cart items, we need to include all non-standard properties as variant keys
                const variantKeys = Object.keys(productData).filter(
                  (key) =>
                    key !== "id" &&
                    key !== "amount" &&
                    key !== "price" &&
                    key !== "stock" &&
                    key !== "cartItemId" &&
                    !config.settings.requiredKeys.includes(key),
                );

                // Create a mock add button with the variant keys
                const mockAddButton = document.createElement("button");
                mockAddButton.setAttribute(
                  "fp-cart-variant-key",
                  variantKeys.join(","),
                );
                cartItemId = _generateCartItemId(productData, mockAddButton);
              }
            }

            if (cartItemId) {
              FlowPlater.log(
                FlowPlater.logLevels.DEBUG,
                `[CartPlugin] Remove button clicked for cart item: ${cartItemId}`,
              );
              state.cart.items.delete(cartItemId);
              updateCartTotals();
              return;
            }
          }

          // Regular product card handling
          const productData = processHtml(productElement);
          if (!productData) {
            FlowPlater.log(
              FlowPlater.logLevels.ERROR,
              "[CartPlugin] Could not extract product data.",
              { element: productElement },
            );
            return;
          }
          const addButton = productElement.querySelector("[fp-cart-add]");

          // --- NEW: Require all variant keys to be selected before adding ---
          const variantKeyAttr = addButton
            ? AttributeMatcher._getRawAttribute(
                addButton as HTMLElement,
                "cart-variant-key",
                null,
              )
            : null;
          if (variantKeyAttr) {
            const variantKeys = variantKeyAttr
              .split(",")
              .map((k) => k.trim())
              .filter(Boolean);
            const missingVariant = variantKeys.some((key) => !productData[key]);
            if (missingVariant) {
              // Optionally show feedback here
              FlowPlater.log(
                FlowPlater.logLevels.WARN,
                `[CartPlugin] Cannot add to cart: Not all variant options are selected.`,
                { variantKeys, productData },
              );
              // Optionally, add a visual cue to the productElement or addButton
              (addButton as HTMLElement).classList.add("fp-variant-missing");
              setTimeout(
                () => (addButton as HTMLElement).classList.remove("fp-variant-missing"),
                1000,
              );
              return;
            }
          }

          if (isAdd) {
            // Read amount from the specific input for this product
            const amountInput = productElement.querySelector(
              "[fp-cart-item-amount]",
            );
            let amountToAdd = 1; // Default to 1 if input not found or invalid
            if (amountInput) {
              const parsedAmount = parseInt((amountInput as HTMLInputElement).value);
              if (!isNaN(parsedAmount) && parsedAmount > 0) {
                amountToAdd = parsedAmount;
              }
            }
            const cartItemId = _generateCartItemId(productData, addButton);
            FlowPlater.log(
              FlowPlater.logLevels.DEBUG,
              `[CartPlugin] Add button clicked for ${cartItemId}, amount from input: ${amountToAdd}`,
            );
            addToCart(productData, amountToAdd, addButton as HTMLElement);
          } else if (isRemove) {
            const cartItemId = _generateCartItemId(productData, addButton);
            FlowPlater.log(
              FlowPlater.logLevels.DEBUG,
              `[CartPlugin] Remove button clicked for product: ${cartItemId}`,
            );
            removeFromCart(productData, addButton as HTMLElement);
          }
        }
      };

      const handleDelegatedChange = (e: any) => {
        const element = e.target.closest("[fp-cart-item-amount]");
        if (element) {
          e.preventDefault();
          e.stopPropagation();

          const productElement = findProductElement(element);
          if (productElement) {
            const productData = processHtml(productElement);
            if (!productData) {
              FlowPlater.log(
                FlowPlater.logLevels.ERROR,
                "[CartPlugin] Could not extract product data on change.",
                { element: productElement },
              );
              return;
            }
            const addButton = productElement.querySelector("[fp-cart-add]");
            const cartItemId = _generateCartItemId(productData, addButton);
            FlowPlater.log(
              FlowPlater.logLevels.DEBUG,
              `[CartPlugin] Input changed for ${cartItemId}, new value: ${element.value}`,
            );
            updateAmount(productData, parseInt(element.value) || 0, addButton as HTMLElement);
          }
          return;
        }

        // For any other change inside a product element, update product states
        const productElement = findProductElement(e.target);
        if (productElement) {
          updateAllProductStates();
        }
      };

      const handleDelegatedInput = (e: any) => {
        const element = e.target.closest("[fp-cart-item-amount]");
        if (!element) return;

        const productElement = findProductElement(element);
        if (productElement) {
          const productData = processHtml(productElement);
          if (!productData) return;
          const addButton = productElement.querySelector("[fp-cart-add]");
          const cartItemId = _generateCartItemId(productData, addButton);
          FlowPlater.log(
            FlowPlater.logLevels.DEBUG,
            `[CartPlugin] Input changed for ${cartItemId}, new value: ${element.value}`,
          );
          updateAmount(productData, parseInt(element.value) || 0, addButton as HTMLElement);
        }
      };

      // Remove old handlers
      const handleCartClick = () => {};
      const handleCartChange = () => {};
      const handleCartInput = () => {};

      setupCartEventListeners();
      FlowPlater.on("afterDomUpdate", setupCartEventListeners);
      const matchingProductElements = AttributeMatcher.findMatchingElements(
        "data",
        config.settings.dataAttribute,
      );
      (Array.isArray(matchingProductElements) ? matchingProductElements : matchingProductElements ? [matchingProductElements] : []).forEach((element: any) => {
        setupProductObserver(element);
      });

      updateCartTotals();

      if (config.settings.debug) {
        FlowPlater.log(
          FlowPlater.logLevels.INFO,
          "[CartPlugin] Initialized successfully",
        );
      }

      return flowplater;
    },
  };

  /**
   * Returns cart items as a comma-separated string: "name (variantKey: variantValue, ...), ..."
   * @param {string[]} [includeKeys] - Optional array of keys to include. If not provided, only variant keys from cartItemId and price are included.
   */
  const getCartItemsAsString = (includeKeys: any) => {
    const items = Array.from(state.cart.items.values());
    return items
      .map((item) => {
        let keysToInclude;
        if (Array.isArray(includeKeys) && includeKeys.length > 0) {
          keysToInclude = includeKeys;
        } else {
          // Only variant keys as defined in cartItemId (after '::'), plus price
          const cartItemId = item.cartItemId || "";
          let variantKeys = [];
          if (cartItemId.includes("::")) {
            const variantPart = cartItemId.split("::")[1];
            variantKeys = variantPart
              .split(";")
              .map((pair: any) => decodeURIComponent(pair.split("=")[0]))
              .filter(Boolean);
          }
          // Always include price by default
          keysToInclude = [...variantKeys, "price"];
        }
        let variantString = "";
        if (keysToInclude.length > 0) {
          variantString = keysToInclude
            .filter((key) => key in item)
            .map((key) => `${key}: ${item[key]}`)
            .join(", ");
        }
        return variantString ? `${item.name} (${variantString})` : item.name;
      })
      .join(", ");
  };

  // Attach to FlowPlater global if not already present
  if (typeof FlowPlater.getCartItemsAsString !== "function") {
    FlowPlater.getCartItemsAsString = getCartItemsAsString;
  }

  return {
    config,
    state,
    hooks,
    globalMethods: {
      getCartItemsAsString,
    },
  };
};

export default CartPlugin;
