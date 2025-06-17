/**
 * @module CartPlugin
 * @description Plugin for managing shopping cart functionality in FlowPlater
 */
/**
 * Cart plugin for FlowPlater that handles shopping cart operations
 *
 * @function CartPlugin
 * @returns {Object} Plugin object containing configuration, state, methods, hooks, and helpers
 */
declare const CartPlugin: (customConfig?: {}) => {
    config: {
        name: string;
        enabled: boolean;
        priority: number;
        version: string;
        dependencies: string[];
        optionalDependencies: never[];
        settings: {
            debug: boolean;
            dataAttribute: string;
            group: string;
            requiredKeys: string[];
        };
        description: string;
        author: string;
        currency: any;
        taxRates: {
            name: string;
            value: number;
        }[];
        locale: any;
    };
    state: {
        cart: {
            items: Map<any, any>;
            totalItems: number;
            totalPrice: number;
            totalDiscount: number;
            totalTax: number;
            totalAmount: number;
            totalItemsFmt: string;
            totalPriceFmt: string;
            totalDiscountFmt: string;
            totalTaxFmt: string;
            totalAmountFmt: string;
        };
        observers: Map<any, any>;
    };
    hooks: {
        /**
         * Called after FlowPlater has fully initialized
         */
        initComplete: (flowplater: any, instances: any) => any;
    };
    globalMethods: {
        getCartItemsAsString: (includeKeys: any) => string;
    };
};
export default CartPlugin;
