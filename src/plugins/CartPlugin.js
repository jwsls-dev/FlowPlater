/**
 * @module CartPlugin
 * @description Plugin for managing shopping cart functionality in FlowPlater
 */

import { AttributeMatcher } from "../utils/AttributeMatcher";

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
    enabled: true,
    priority: 50,
    version: "1.0.0",
    dependencies: ["data-extractor"],
    optionalDependencies: [],
    settings: {
      debug: false,
      dataAttribute: "product", // Default data attribute to look for
      group: "cart",
      requiredKeys: ["id", "name"], // Required keys in product data
    },
    description: "Shopping cart functionality for FlowPlater",
    author: "FlowPlater Team",
    currency: { name: "USD", symbol: "$", precision: 2 },
    taxRates: [{ name: "VAT", value: 1.21 }],
  };

  Object.assign(config, customConfig);

  // --- Helper function to generate Composite Cart Item ID ---
  const _generateCartItemId = (productData, actionElement) => {
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
    for (const key of variantKeys) {
      if (productData.hasOwnProperty(key)) {
        const value = productData[key];
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
      } else {
        FlowPlater.log(
          FlowPlater.logLevels.WARN,
          `[CartPlugin] Variant key '${key}' not found in product data for ID generation.`,
        );
      }
    }

    if (variantParts.length === 0) {
      return baseId.toString(); // No valid variant parts found, use base ID
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
    },
    observers: new Map(), // Store MutationObservers for product elements
  };

  // Ensure serializeCart and deserializeCart are defined here
  const serializeCart = () => {
    // Return items as an array of the map's values (item objects)
    const items = Array.from(state.cart.items.values());
    // Add cartItemId to each item if not already present
    items.forEach((item) => {
      if (!item.cartItemId) {
        item.cartItemId = _generateCartItemId(item, null);
      }
    });
    return {
      items,
      totalItems: state.cart.totalItems,
      totalPrice: state.cart.totalPrice,
      totalDiscount: state.cart.totalDiscount,
      totalTax: state.cart.totalTax,
      totalAmount: state.cart.totalAmount,
    };
  };

  const deserializeCart = (data) => {
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
      data.items.forEach((item) => {
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
  const findProductElement = (target) => {
    let productElement = AttributeMatcher.findClosestParent(
      "data",
      config.settings.dataAttribute,
      true,
      target,
    );
    return productElement;
  };

  const findParentElement = (target, attributeName) => {
    return AttributeMatcher.findClosestParent(
      attributeName,
      undefined,
      true,
      target,
    );
  };

  /**
   * Calculate price with discount
   * @param {number} price - Original price
   * @param {string} discount - Discount value (e.g. "10%" or "5")
   * @returns {number} Final price after discount
   */
  const calculateDiscountedPrice = (price, discount) => {
    if (!discount) return price;
    if (discount.endsWith("%")) {
      const percentage = parseFloat(discount) / 100;
      return price * (1 - percentage);
    }
    return Math.max(0, price - parseFloat(discount));
  };

  // Returns the amount in the cart for a given cartItemId
  const getCartItemAmount = (cartItemId) => {
    const item = state.cart.items.get(cartItemId);
    return item ? item.amount : 0;
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

    state.cart.items.forEach((item) => {
      totalItems += item.amount;
      const itemPrice = item.price || 0;
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

    // Update all product elements on the page that are NOT in the cart
    AttributeMatcher.findMatchingElements(
      "data",
      config.settings.dataAttribute,
    ).forEach((productElement) => {
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

    // Update cart totals
    totalAmount = totalPrice - totalDiscount + totalTax;
    state.cart.totalItems = totalItems;
    state.cart.totalPrice = totalPrice;
    state.cart.totalDiscount = totalDiscount;
    state.cart.totalTax = totalTax;
    state.cart.totalAmount = totalAmount;

    // Update display elements
    AttributeMatcher.findMatchingElements("cart-total-count").forEach((el) => {
      el.textContent = totalItems.toString();
    });
    AttributeMatcher.findMatchingElements("cart-total-price").forEach((el) => {
      el.textContent = totalPrice.toFixed(2);
    });
    AttributeMatcher.findMatchingElements("cart-total-discount").forEach(
      (el) => {
        el.textContent = totalDiscount.toFixed(2);
      },
    );
    AttributeMatcher.findMatchingElements("cart-total-tax").forEach((el) => {
      el.textContent = totalTax.toFixed(2);
    });
    AttributeMatcher.findMatchingElements("cart-total-amount").forEach((el) => {
      el.textContent = totalAmount.toFixed(2);
    });

    const cartData = serializeCart();
    FlowPlater.updateGroup(config.settings.group, cartData);
    FlowPlater.trigger("cart:update", null, { cart: state.cart });

    // Never disable remove buttons in cart
    document
      .querySelectorAll(
        `[fp-group="${config.settings.group}"] [fp-cart-remove]`,
      )
      .forEach((removeButton) => {
        removeButton.disabled = false;
      });
  };

  function formatPrice(price) {
    let priceString = price.toFixed(config.currency.precision);
    if (config.currency.symbol) {
      priceString = `${config.currency.symbol} ${priceString}`;
    }
    return priceString;
  }

  /**
   * Add product to cart
   * @param {Object} product - Product data
   * @param {number} amount - Amount to add
   */
  const addToCart = (product, amount = 1, actionElement = null) => {
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
    const maxAmount =
      product.stock === undefined || product.stock === null
        ? Infinity
        : product.stock;

    if (existingItem) {
      const currentAmount = existingItem.amount;
      const newAmount = Math.min(currentAmount + amount, maxAmount);
      if (newAmount === currentAmount) return; // No change possible
      existingItem.amount = newAmount;
    } else {
      const initialAmount = Math.min(amount, maxAmount);
      if (initialAmount <= 0) return;
      state.cart.items.set(cartItemId, {
        ...product,
        cartItemId: cartItemId,
        amount: initialAmount,
        taxRate: product.taxRate || config.taxRates[0].name,
      });
    }
    updateCartTotals();
  };

  /**
   * Remove product from cart
   * @param {string} productId - Product ID to remove
   */
  const removeFromCart = (productData, actionElement = null) => {
    const cartItemId = _generateCartItemId(productData, actionElement);
    if (!cartItemId) return;
    state.cart.items.delete(cartItemId);
    updateCartTotals();
  };

  // --- Start of Variant Merging Logic (Moved from DataExtractor) ---
  const _performVariantMerge = (baseData) => {
    // Use settings directly from this plugin's config
    const settings = config.settings;
    const variantKey = settings.variantKey || "variant"; // Use defaults if not set
    const variantIdKey = settings.variantIdKey || "id";
    const variantSelectorKey =
      settings.variantSelectorKey || "selected-variant";

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

  const processHtml = (html) => {
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
  const updateAmount = (productData, amount, actionElement = null) => {
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
      removeFromCart(productData, actionElement);
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
  const setupProductObserver = (element) => {
    if (state.observers.has(element)) return;

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          (mutation.type === "attributes" &&
            AttributeMatcher._attributeMatchesNormalizedName(
              mutation.attributeName,
              "data",
            )) ||
          (mutation.type === "characterData" &&
            AttributeMatcher._hasAttribute(
              mutation.target.parentElement,
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
    initComplete: function (flowplater, instances) {
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

      const setupCartEventListeners = () => {
        document
          .querySelectorAll(
            "[fp-cart-add], [fp-cart-remove], [fp-cart-item-amount]",
          )
          .forEach((element) => {
            element.removeEventListener("click", handleCartClick);
            element.removeEventListener("change", handleCartChange);
          });
        document
          .querySelectorAll("[fp-cart-add], [fp-cart-remove]")
          .forEach((element) => {
            element.addEventListener("click", handleCartClick);
          });
        document
          .querySelectorAll("[fp-cart-item-amount]")
          .forEach((element) => {
            element.addEventListener("change", handleCartChange);
          });
        // Add input event listener for real-time updates as well
        document
          .querySelectorAll("[fp-cart-item-amount]")
          .forEach((element) => {
            element.removeEventListener("input", handleCartInput);
            element.addEventListener("input", handleCartInput);
          });
        // ... (Initialize input values/button states)
        AttributeMatcher.findMatchingElements(
          "data",
          config.settings.dataAttribute,
        ).forEach((productElement) => {
          // Skip button state management for cart items
          if (productElement.closest(`[fp-group="${config.settings.group}"]`)) {
            // For cart items, only set up input/select/textarea change listeners
            productElement
              .querySelectorAll(
                "input:not([fp-cart-item-amount]), select, textarea",
              )
              .forEach((inputEl) => {
                inputEl.removeEventListener("change", updateCartTotals);
                inputEl.addEventListener("change", updateCartTotals);
              });
            return;
          }

          const productData = processHtml(productElement);
          const cartItemId = _generateCartItemId(
            productData,
            productElement.querySelector("[fp-cart-add]"),
          );
          const cartItem = state.cart.items.get(cartItemId);
          const amountInput = productElement.querySelector(
            "[fp-cart-item-amount]",
          );
          const addButton = productElement.querySelector("[fp-cart-add]");
          const removeButton = productElement.querySelector("[fp-cart-remove]");

          const currentAmount = cartItem?.amount || 0;
          const maxStock =
            productData.stock === undefined || productData.stock === null
              ? Infinity
              : productData.stock;
          const atMaxStock = currentAmount >= maxStock;
          const atMinStock = currentAmount <= 0;

          if (amountInput) {
            amountInput.value = currentAmount.toString();
            amountInput.min = "0";
            amountInput.max = maxStock;
          }
          if (addButton) addButton.disabled = atMaxStock;
          if (removeButton) removeButton.disabled = atMinStock;

          // Add change event listeners to all inputs/selects/textareas except [fp-cart-item-amount]
          productElement
            .querySelectorAll(
              "input:not([fp-cart-item-amount]), select, textarea",
            )
            .forEach((inputEl) => {
              inputEl.removeEventListener("change", updateCartTotals);
              inputEl.addEventListener("change", updateCartTotals);
            });
        });
      };

      // Modify handleCartClick for 'Add' button
      const handleCartClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const element = e.currentTarget;
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
          if (isAdd) {
            // Read amount from the specific input for this product
            const amountInput = productElement.querySelector(
              "[fp-cart-item-amount]",
            );
            let amountToAdd = 1; // Default to 1 if input not found or invalid
            if (amountInput) {
              const parsedAmount = parseInt(amountInput.value);
              if (!isNaN(parsedAmount) && parsedAmount > 0) {
                amountToAdd = parsedAmount;
              }
            }
            const cartItemId = _generateCartItemId(productData, addButton);
            FlowPlater.log(
              FlowPlater.logLevels.DEBUG,
              `[CartPlugin] Add button clicked for ${cartItemId}, amount from input: ${amountToAdd}`,
            );
            addToCart(productData, amountToAdd, addButton);
          } else if (isRemove) {
            const cartItemId = _generateCartItemId(productData, addButton);
            FlowPlater.log(
              FlowPlater.logLevels.DEBUG,
              `[CartPlugin] Remove button clicked for product: ${cartItemId}`,
            );
            removeFromCart(productData, addButton);
          }
        }
      };

      // handleCartChange calls the modified updateAmount
      const handleCartChange = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const element = e.currentTarget;
        if (element.hasAttribute("fp-cart-item-amount")) {
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
            updateAmount(productData, parseInt(element.value) || 0, addButton);
          }
        }
      };

      // Add handler for input event on amount input
      const handleCartInput = (e) => {
        const element = e.currentTarget;
        if (element.hasAttribute("fp-cart-item-amount")) {
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
            updateAmount(productData, parseInt(element.value) || 0, addButton);
          }
        }
      };

      setupCartEventListeners();
      FlowPlater.on("afterDomUpdate", setupCartEventListeners);
      const matchingProductElements = AttributeMatcher.findMatchingElements(
        "data",
        config.settings.dataAttribute,
      );
      matchingProductElements.forEach(setupProductObserver);

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

  return {
    config,
    state,
    hooks,
  };
};

export default CartPlugin;
