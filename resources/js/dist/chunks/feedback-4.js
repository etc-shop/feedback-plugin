"use strict";
(self["webpackChunkplentymarkets_feedback"] = self["webpackChunkplentymarkets_feedback"] || []).push([[4],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/order/FeedbackOrder.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/order/FeedbackOrder.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.string.replace.js */ "./node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _FeedbackOrderForm_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./FeedbackOrderForm.vue */ "./resources/js/src/app/components/order/FeedbackOrderForm.vue");
/* harmony import */ var _FeedbackOrderItem_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./FeedbackOrderItem.vue */ "./resources/js/src/app/components/order/FeedbackOrderItem.vue");
/* harmony import */ var _mixins_loadFeedbackModule__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../mixins/loadFeedbackModule */ "./resources/js/src/app/mixins/loadFeedbackModule.js");







/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'FeedbackOrder',
  components: {
    'feedback-order-form': _FeedbackOrderForm_vue__WEBPACK_IMPORTED_MODULE_4__["default"],
    'feedback-order-item': _FeedbackOrderItem_vue__WEBPACK_IMPORTED_MODULE_5__["default"]
  },
  mixins: [_mixins_loadFeedbackModule__WEBPACK_IMPORTED_MODULE_6__["default"]],
  props: {
    variations: Object,
    items: Array,
    itemUrls: Object,
    itemImages: Object,
    options: Object,
    splitItemBundles: Number,
    accessKey: String,
    orderId: String
  },
  data: function data() {
    return {
      isLoading: true,
      page: 1
    };
  },
  computed: {
    orderItems: function orderItems() {
      var aggregate = [];
      for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].itemVariationId > 0 && this.items[i].orderItemName.indexOf('[-]') === -1) {
          var key = this.items[i].itemVariationId;
          var bundleType = this.variations[key].variation.bundleType;
          var itemName = this.items[i].orderItemName;
          aggregate.push({
            name: this.filterItemName(itemName, bundleType),
            image: this.itemImages[key],
            url: this.itemUrls[key],
            variationId: key,
            itemId: this.variations[key].item.id,
            attributes: this.variations[key].attributes
          });

          // Check itemBundleSplit
          if (bundleType === 'bundle' && this.splitItemBundles < 1) {
            for (var j = 0; j < this.items[i].bundleComponents.length; j++) {
              var variationId = this.items[i].bundleComponents[j].data.variation.id;
              aggregate.push({
                name: this.$options.filters.itemName(this.items[i].bundleComponents[j].data),
                image: this.itemImages[variationId],
                url: this.itemUrls[variationId],
                variationId: variationId,
                itemId: this.items[i].bundleComponents[j].data.itemId,
                attributes: this.items[i].bundleComponents[j].data.attributes
              });
            }
          }
        }
      }
      return aggregate;
    },
    pagination: function pagination() {
      var amount = this.page * this.options.itemsPerRow * this.options.rowsPerPage;
      return this.orderItems.slice(0, amount);
    },
    trueItemsPerRow: function trueItemsPerRow() {
      return Math.min(this.orderItems.length, this.options.itemsPerRow);
    }
  },
  mounted: function mounted() {
    var _this = this;
    $.when(this.getUser()).done(function () {
      _this.isLoading = false;
      Vue.nextTick(function () {
        // DOM updated
        window.dispatchEvent(new Event('resize'));
      });
    });
  },
  methods: {
    getUser: function getUser() {
      // Get array of item and variationIds
      var itemIds = [];
      var variationIds = [];
      for (var i = 0; i < this.orderItems.length; i++) {
        var orderItem = this.orderItems[i];
        itemIds.push(orderItem.itemId);
        variationIds.push(orderItem.variationId);
      }
      var data = {
        itemIds: itemIds,
        variationIds: variationIds,
        allowFeedbacksOnlyIfPurchased: false,
        numberOfFeedbacks: this.options.numberOfFeedbacks
      };
      if (this.orderId && this.accessKey) {
        data.orderId = this.orderId;
        data.accessKey = this.accessKey;
      }
      return this.$store.dispatch('loadFeedbackUser', {
        data: data,
        itemId: this.itemId,
        variationId: this.variationId
      });
    },
    nextPage: function nextPage() {
      var amount = this.page * this.options.itemsPerRow * this.options.rowsPerPage;
      if (amount < this.orderItems.length) {
        this.page += 1;
      }
    },
    filterItemName: function filterItemName(itemName, bundleType) {
      if (bundleType === 'bundle') {
        return itemName.replace('[BUNDLE]', '');
      }
      if (bundleType === 'bundle_item') {
        return itemName.replace('[-]', '');
      }
      return itemName;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/order/FeedbackOrderForm.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/order/FeedbackOrderForm.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.symbol.to-primitive.js */ "./node_modules/core-js/modules/es.symbol.to-primitive.js");
/* harmony import */ var core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.filter.js */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.date.to-primitive.js */ "./node_modules/core-js/modules/es.date.to-primitive.js");
/* harmony import */ var core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor.js */ "./node_modules/core-js/modules/es.object.get-own-property-descriptor.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptors.js */ "./node_modules/core-js/modules/es.object.get-own-property-descriptors.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.object.keys.js */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
















/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'FeedbackOrderForm',
  props: {
    allowGuestFeedbacks: Boolean,
    numberOfFeedbacks: Number,
    accessKey: String,
    orderId: String,
    showEmptyRatings: Boolean
  },
  data: function data() {
    return {
      feedback: {
        ratingValue: 0,
        authorName: '',
        title: '',
        message: '',
        type: 'review',
        targetId: 0,
        honeypot: ''
      },
      isLoading: false,
      isRated: false,
      titleMissing: false,
      item: {
        url: '',
        image: '',
        variationId: 0,
        name: '',
        itemId: 0,
        attributes: {}
      }
    };
  },
  computed: _objectSpread({
    starIds: function starIds() {
      var ids = [];
      var starClass = this.isRated ? 'star-rated' : 'star';
      for (var i = 5; i > 0; i--) {
        ids.push({
          value: i,
          id: 'star-' + i + '-' + this.item.variationId + '-form',
          class: starClass
        });
      }
      return ids;
    },
    rows: function rows() {
      // Dynamically set rows to offset the optional authorName input
      return this.authenticatedUser.id > 0 ? 8 : 6;
    },
    limitReached: function limitReached() {
      var key = this.item.itemId;
      return this.authenticatedUser.limitReached[key];
    }
  }, (0,vuex__WEBPACK_IMPORTED_MODULE_15__.mapState)({
    authenticatedUser: function authenticatedUser(state) {
      return state.feedback.authenticatedUser;
    }
  })),
  mounted: function mounted() {
    var _self = this;
    vueEventHub.$on('orderItemFeedback_showform', function (event) {
      _self.prepare(event);
    });
  },
  methods: {
    prepare: function prepare(event) {
      this.item = event.item;
      this.isRated = event.isRated;
      var _self = this;
      Vue.nextTick(function () {
        _self.feedback = event.feedback;
        $(_self.$refs.orderItemFeedbackModal).modal('show');
      });
    },
    createFeedback: function createFeedback() {
      if (this.isLoading || this.feedback.honeypot.length > 0) {
        return;
      }
      if (!this.feedback.title) {
        this.titleMissing = true;
        return;
      }
      if (this.limitReached) {
        return;
      }
      this.isLoading = true;
      this.feedback.options = this.options;
      this.feedback.targetId = this.item.variationId;
      this.feedback.accessKey = this.accessKey;
      this.feedback.orderId = this.orderId;
      var _self = this;
      $.ajax({
        type: 'POST',
        url: '/rest/feedbacks/feedback/create',
        data: this.feedback,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        dataType: 'json',
        xhrFields: {
          withCredentials: true
        },
        success: function success(data) {
          vueEventHub.$emit('orderItemFeedback_created', {
            feedback: JSON.parse(JSON.stringify(_self.feedback))
          });
          _self.isLoading = false;
          _self.feedback.authorName = '';
          _self.feedback.message = '';
          _self.feedback.title = '';
          _self.feedback.ratingValue = 0;
          _self.titleMissing = false;
          _self.ratingMissing = false;
          $(_self.$refs.orderItemFeedbackModal).modal('hide');
        },
        error: function error(jqXHR, textStatus, errorThrown) {
          console.error(errorThrown);
          _self.isLoading = false;
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/order/FeedbackOrderItem.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/order/FeedbackOrderItem.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'FeedbackOrderItem',
  props: {
    item: Object,
    numberOfColumns: Number
  },
  data: function data() {
    return {
      isRated: false,
      feedback: {
        ratingValue: 0,
        authorName: '',
        title: '',
        message: '',
        type: 'review',
        targetId: 0,
        honeypot: ''
      }
    };
  },
  computed: {
    starIds: function starIds() {
      var ids = [];
      var starClass = this.isRated ? 'star-rated' : 'star';
      for (var i = 5; i > 0; i--) {
        ids.push({
          value: i,
          id: 'star-' + i + '-' + this.item.variationId,
          class: starClass
        });
      }
      return ids;
    },
    variationAttributes: function variationAttributes() {
      return null;
    }
  },
  mounted: function mounted() {
    var _this = this;
    vueEventHub.$on('orderItemFeedback_created', function (event) {
      if (event.feedback.targetId === _this.item.variationId) {
        _this.feedback = event.feedback;
        _this.isRated = true;
      }
    });
  },
  methods: {
    handleRating: function handleRating(value) {
      if (!this.isRated && value > 0) {
        this.feedback.ratingValue = value;
      }
      vueEventHub.$emit('orderItemFeedback_showform', {
        item: this.item,
        feedback: this.feedback,
        isRated: this.isRated
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/order/FeedbackOrder.vue?vue&type=template&id=406beae6":
/*!********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/order/FeedbackOrder.vue?vue&type=template&id=406beae6 ***!
  \********************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: function() { return /* binding */ render; },
/* harmony export */   staticRenderFns: function() { return /* binding */ staticRenderFns; }
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("section", {
    staticClass: "feedback-container feedback-orderitem-container"
  }, [_c("div", {
    staticClass: "title"
  }, [_vm._v("\n    " + _vm._s(_vm.$translate("Feedback::Feedback.orderItemTitle")) + "\n  ")]), _vm._v(" "), _c("hr"), _vm._v(" "), !_vm.isLoading ? _c("div", {
    staticClass: "feedback-items row"
  }, _vm._l(_vm.pagination, function (order) {
    return _c("feedback-order-item", {
      key: order.variationId,
      attrs: {
        item: order,
        "number-of-columns": _vm.trueItemsPerRow
      }
    });
  }), 1) : _c("div", {
    staticClass: "w-100 text-center"
  }, [_c("p", [_vm._v(_vm._s(_vm.$translate("Feedback::Feedback.loadingItems")))])]), _vm._v(" "), !_vm.isLoading && _vm.page * _vm.options.itemsPerRow * _vm.options.rowsPerPage < _vm.orderItems.length ? _c("button", {
    staticClass: "btn btn-default btn-block feedback-loadmore",
    on: {
      click: function click($event) {
        return _vm.nextPage();
      }
    }
  }, [_vm._v("\n    Weitere Artikel anzeigen\n  ")]) : _vm._e(), _vm._v(" "), !_vm.isLoading ? _c("feedback-order-form", {
    attrs: {
      "allow-guest-feedbacks": _vm.options.allowGuestFeedbacks,
      "number-of-feedbacks": _vm.options.numberOfFeedbacks,
      "access-key": _vm.accessKey,
      "order-id": _vm.orderId,
      "show-empty-ratings": _vm.options.showEmptyRatingsInOrderConfirmation
    }
  }) : _vm._e()], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/order/FeedbackOrderForm.vue?vue&type=template&id=474982ca":
/*!************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/order/FeedbackOrderForm.vue?vue&type=template&id=474982ca ***!
  \************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: function() { return /* binding */ render; },
/* harmony export */   staticRenderFns: function() { return /* binding */ staticRenderFns; }
/* harmony export */ });
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_0__);

var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    ref: "orderItemFeedbackModal",
    staticClass: "modal fade feedback-orderitem-modal",
    attrs: {
      tabindex: "-1",
      role: "dialog",
      "aria-labelledby": "feedbackOrderItem-" + _vm._uid,
      "aria-hidden": "true"
    }
  }, [_c("div", {
    staticClass: "modal-dialog",
    attrs: {
      role: "document"
    }
  }, [_c("div", {
    staticClass: "modal-content"
  }, [_c("div", {
    staticClass: "modal-header"
  }, [_c("span", {
    staticClass: "modal-title h3",
    attrs: {
      id: "feedbackConfirmDeleteLabel-" + _vm._uid
    }
  }, [_vm._v(_vm._s(_vm.$translate("Feedback::Feedback.customerReviews")))]), _vm._v(" "), _vm._m(0)]), _vm._v(" "), _c("div", {
    staticClass: "modal-body row"
  }, [_c("div", {
    staticClass: "col-4"
  }, [_c("a", {
    attrs: {
      href: _vm.item.url
    }
  }, [_c("img", {
    attrs: {
      alt: _vm.item.name,
      src: _vm.item.image
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "stars"
  }, [_vm._l(_vm.starIds, function (starId) {
    return [_c("input", {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.feedback.ratingValue,
        expression: "feedback.ratingValue"
      }],
      key: "stars_input_" + starId.id,
      class: starId.class,
      attrs: {
        id: starId.id,
        type: "radio",
        disabled: _vm.isRated,
        name: "ratingValue"
      },
      domProps: {
        value: starId.value,
        checked: _vm._q(_vm.feedback.ratingValue, starId.value)
      },
      on: {
        change: function change($event) {
          return _vm.$set(_vm.feedback, "ratingValue", starId.value);
        }
      }
    }), _vm._v(" "), _c("label", {
      key: "stars_label_" + starId.id,
      staticClass: "new_star",
      attrs: {
        for: starId.id
      }
    }, [_c("svg", {
      class: starId.class,
      staticStyle: {
        "fill-rule": "evenodd",
        "clip-rule": "evenodd",
        "stroke-linejoin": "round",
        "stroke-miterlimit": "2"
      },
      attrs: {
        for: starId.id,
        width: "100%",
        height: "100%",
        viewBox: "0 0 31 30",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        "xmlns:xlink": "http://www.w3.org/1999/xlink",
        "xml:space": "preserve",
        "xmlns:serif": "http://www.serif.com/"
      }
    }, [_c("path", {
      staticStyle: {
        "fill-rule": "nonzero"
      },
      attrs: {
        d: "M30.5,11.564c0,0.265 -0.156,0.553 -0.469,0.866l-6.544,6.382l1.55,9.014c0.012,0.085 0.018,0.205 0.018,0.361c0,0.252 -0.063,0.466 -0.189,0.64c-0.126,0.174 -0.31,0.261 -0.55,0.261c-0.228,0 -0.469,-0.072 -0.721,-0.216l-8.095,-4.255l-8.095,4.255c-0.264,0.144 -0.505,0.216 -0.721,0.216c-0.253,0 -0.442,-0.087 -0.568,-0.261c-0.126,-0.174 -0.189,-0.388 -0.189,-0.64c0,-0.072 0.012,-0.192 0.036,-0.361l1.55,-9.014l-6.562,-6.382c-0.301,-0.325 -0.451,-0.613 -0.451,-0.866c0,-0.444 0.337,-0.721 1.01,-0.829l9.05,-1.316l4.057,-8.203c0.228,-0.493 0.522,-0.739 0.883,-0.739c0.361,0 0.655,0.246 0.883,0.739l4.057,8.203l9.05,1.316c0.673,0.108 1.01,0.385 1.01,0.829Z"
      }
    })])])];
  })], 2)]), _vm._v(" "), _c("div", {
    staticClass: "col-8"
  }, [_c("a", {
    staticClass: "mb-3",
    attrs: {
      href: _vm.item.url
    }
  }, [_vm._v(_vm._s(_vm.item.name) + "\n            "), _vm._l(_vm.item.attributes, function (attribute) {
    return [_vm._v(" | " + _vm._s(attribute.attribute.names.name) + ": " + _vm._s(attribute.value.names.name))];
  })], 2), _vm._v(" "), !_vm.authenticatedUser.isLoggedIn ? _c("div", {
    staticClass: "form-group"
  }, [_c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.feedback.authorName,
      expression: "feedback.authorName"
    }],
    staticClass: "form-control",
    attrs: {
      id: "author",
      type: "text",
      name: "author",
      disabled: _vm.isRated || _vm.limitReached,
      placeholder: _vm.$translate("Feedback::Feedback.authorName")
    },
    domProps: {
      value: _vm.feedback.authorName
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.feedback, "authorName", $event.target.value);
      }
    }
  }), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.feedback.honeypot,
      expression: "feedback.honeypot"
    }],
    staticClass: "form-control",
    attrs: {
      id: "feedback-textfield",
      type: "text",
      disabled: _vm.isRated || _vm.limitReached,
      name: "feedback-textfield"
    },
    domProps: {
      value: _vm.feedback.honeypot
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.feedback, "honeypot", $event.target.value);
      }
    }
  })]) : _vm._e(), _vm._v(" "), _c("div", {
    staticClass: "form-group"
  }, [_c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.feedback.title,
      expression: "feedback.title"
    }],
    staticClass: "form-control",
    class: {
      "is-invalid": _vm.titleMissing
    },
    attrs: {
      id: "title",
      type: "text",
      name: "title",
      disabled: _vm.isRated || _vm.limitReached,
      placeholder: _vm.$translate("Feedback::Feedback.title")
    },
    domProps: {
      value: _vm.feedback.title
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.feedback, "title", $event.target.value);
      }
    }
  }), _vm._v(" "), _c("div", {
    staticClass: "invalid-feedback"
  }, [_vm._v("\n              " + _vm._s(_vm.$translate("Feedback::Feedback.titleRequired")) + "\n            ")])]), _vm._v(" "), _c("div", {
    staticClass: "form-group"
  }, [_c("textarea", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.feedback.message,
      expression: "feedback.message"
    }],
    staticClass: "form-control",
    attrs: {
      id: "message",
      name: "message",
      rows: _vm.rows,
      disabled: _vm.isRated || _vm.limitReached,
      placeholder: _vm.$translate("Feedback::Feedback.reviewMessage")
    },
    domProps: {
      value: _vm.feedback.message
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.feedback, "message", $event.target.value);
      }
    }
  })])])]), _vm._v(" "), _c("div", {
    staticClass: "modal-footer"
  }, [!_vm.isRated && !_vm.limitReached ? _c("button", {
    staticClass: "btn btn-primary btn-appearance btn-block",
    attrs: {
      type: "button",
      disabled: _vm.isRated || _vm.showEmptyRatings && _vm.feedback.ratingValue === 0
    },
    on: {
      click: function click($event) {
        return _vm.createFeedback();
      }
    }
  }, [_vm._v("\n          " + _vm._s(_vm.$translate("Feedback::Feedback.submitReview")) + "\n        ")]) : _vm.limitReached ? _c("div", {
    staticClass: "w-100 text-center"
  }, [_vm._v("\n          " + _vm._s(_vm.$translate("Feedback::Feedback.maximumNumberOfFeedbacksReached")) + "\n        ")]) : _c("div", {
    staticClass: "w-100 text-center"
  }, [_vm._v("\n          " + _vm._s(_vm.$translate("Feedback::Feedback.thankYou")) + "\n        ")])])])])]);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("button", {
    staticClass: "close",
    attrs: {
      type: "button",
      "data-dismiss": "modal",
      "aria-label": "Close"
    }
  }, [_c("span", {
    attrs: {
      "aria-hidden": "true"
    }
  }, [_vm._v("×")])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/order/FeedbackOrderItem.vue?vue&type=template&id=713d3199":
/*!************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/order/FeedbackOrderItem.vue?vue&type=template&id=713d3199 ***!
  \************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: function() { return /* binding */ render; },
/* harmony export */   staticRenderFns: function() { return /* binding */ staticRenderFns; }
/* harmony export */ });
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_0__);

var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "feedback-item mb-4",
    class: "col-12 col-sm-" + 12 / _vm.numberOfColumns
  }, [_c("div", {
    staticClass: "stars",
    on: {
      click: function click($event) {
        return _vm.handleRating(0);
      }
    }
  }, [_c("form", [_vm._l(_vm.starIds, function (starId) {
    return [_c("input", {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.feedback.ratingValue,
        expression: "feedback.ratingValue"
      }],
      key: "stars_input_" + starId.id,
      class: starId.class,
      attrs: {
        id: starId.id,
        type: "radio",
        name: "ratingValue",
        disabled: _vm.isRated
      },
      domProps: {
        value: starId.value,
        checked: _vm._q(_vm.feedback.ratingValue, starId.value)
      },
      on: {
        click: function click($event) {
          return _vm.handleRating(starId.value);
        },
        change: function change($event) {
          return _vm.$set(_vm.feedback, "ratingValue", starId.value);
        }
      }
    }), _vm._v(" "), _c("label", {
      key: "stars_label_" + starId.id,
      staticClass: "new_star",
      attrs: {
        for: starId.id
      }
    }, [_c("svg", {
      class: starId.class,
      staticStyle: {
        "fill-rule": "evenodd",
        "clip-rule": "evenodd",
        "stroke-linejoin": "round",
        "stroke-miterlimit": "2"
      },
      attrs: {
        for: starId.id,
        width: "100%",
        height: "100%",
        viewBox: "0 0 31 30",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        "xmlns:xlink": "http://www.w3.org/1999/xlink",
        "xml:space": "preserve",
        "xmlns:serif": "http://www.serif.com/"
      }
    }, [_c("path", {
      staticStyle: {
        "fill-rule": "nonzero"
      },
      attrs: {
        d: "M30.5,11.564c0,0.265 -0.156,0.553 -0.469,0.866l-6.544,6.382l1.55,9.014c0.012,0.085 0.018,0.205 0.018,0.361c0,0.252 -0.063,0.466 -0.189,0.64c-0.126,0.174 -0.31,0.261 -0.55,0.261c-0.228,0 -0.469,-0.072 -0.721,-0.216l-8.095,-4.255l-8.095,4.255c-0.264,0.144 -0.505,0.216 -0.721,0.216c-0.253,0 -0.442,-0.087 -0.568,-0.261c-0.126,-0.174 -0.189,-0.388 -0.189,-0.64c0,-0.072 0.012,-0.192 0.036,-0.361l1.55,-9.014l-6.562,-6.382c-0.301,-0.325 -0.451,-0.613 -0.451,-0.866c0,-0.444 0.337,-0.721 1.01,-0.829l9.05,-1.316l4.057,-8.203c0.228,-0.493 0.522,-0.739 0.883,-0.739c0.361,0 0.655,0.246 0.883,0.739l4.057,8.203l9.05,1.316c0.673,0.108 1.01,0.385 1.01,0.829Z"
      }
    })])])];
  })], 2)]), _vm._v(" "), _c("a", {
    attrs: {
      href: _vm.item.url
    }
  }, [_c("img", {
    staticClass: "py-2",
    attrs: {
      alt: _vm.item.name,
      src: _vm.item.image
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "feedback-item-link"
  }, [_c("a", {
    attrs: {
      href: _vm.item.url
    }
  }, [_vm._v(_vm._s(_vm.item.name))]), _vm._v(" "), _vm._l(_vm.item.attributes, function (attribute) {
    return _c("div", {
      key: _vm.item.itemId + "-" + attribute.valueId
    }, [_c("strong", [_vm._v(_vm._s(attribute.attribute.names.name) + ": ")]), _vm._v(" "), _c("span", [_vm._v(_vm._s(attribute.value.names.name))])]);
  })], 2)]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/src/app/mixins/loadFeedbackModule.js":
/*!***********************************************************!*\
  !*** ./resources/js/src/app/mixins/loadFeedbackModule.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _store_FeedbackModule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../store/FeedbackModule */ "./resources/js/src/app/store/FeedbackModule.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  created: function created() {
    if (!this.$store.hasModule('feedback') && !App.isSSR) {
      this.$store.registerModule('feedback', _store_FeedbackModule__WEBPACK_IMPORTED_MODULE_0__["default"], {
        preserveState: !!this.$store.state.feedback
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/src/app/store/FeedbackModule.js":
/*!******************************************************!*\
  !*** ./resources/js/src/app/store/FeedbackModule.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.filter.js */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ "./node_modules/core-js/modules/es.array.map.js");
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_3__);




var loadPaginatedFeedbacksLock = false;
var loadFeedbackUserLock = false;
var state = function state() {
  return {
    authenticatedUser: {},
    counts: {},
    feedbacks: [],
    itemAttributes: [],
    pagination: {
      isLastPage: true,
      lastPage: 1,
      currentPage: 1
    }
  };
};
var mutations = {
  setFeedbackAuthenticatedUser: function setFeedbackAuthenticatedUser(state, authenticatedUser) {
    state.authenticatedUser = authenticatedUser;
  },
  setFeedbackCounts: function setFeedbackCounts(state, counts) {
    state.counts = counts;
  },
  setFeedbacks: function setFeedbacks(state, feedbacks) {
    state.feedbacks = state.feedbacks.concat(feedbacks);
  },
  setFeedbackItemAttributes: function setFeedbackItemAttributes(state, attributes) {
    state.itemAttributes = attributes;
  },
  setFeedbackPagination: function setFeedbackPagination(state, pagination) {
    state.pagination.lastPage = pagination.lastPage;
    state.pagination.isLastPage = pagination.isLastPage;
  },
  incrementCurrentFeedbackPage: function incrementCurrentFeedbackPage(state) {
    state.pagination.currentPage++;
  },
  addFeedback: function addFeedback(state, feedback) {
    // Add the feedback to the current users feedback list
    state.authenticatedUser.feedbacks.unshift(feedback);
    if (feedback.isVisible) {
      var ratingValue = parseInt(feedback.feedbackRating.rating.ratingValue);
      if (ratingValue > 0 && ratingValue <= 5) {
        state.counts['ratingsCountOf' + ratingValue]++;
        state.counts.ratingsCountTotal++;
        recalculateAverage(state);
      }
    }
  },
  deleteFeedback: function deleteFeedback(state, _ref) {
    var feedbackId = _ref.feedbackId,
      parentFeedbackId = _ref.parentFeedbackId,
      feedback = _ref.feedback;
    // If visible, adjust counts
    if (feedback.isVisible && parentFeedbackId === null) {
      var ratingValue = parseInt(feedback.feedbackRating.rating.ratingValue);
      if (ratingValue > 0 && ratingValue <= 5) {
        state.counts['ratingsCountOf' + ratingValue]--;
        state.counts.ratingsCountTotal--;
        recalculateAverage(state);
      }
    }
    if (parentFeedbackId === null) {
      state.feedbacks = filterFeedbackList(state.feedbacks, feedbackId);
      state.authenticatedUser.feedbacks = filterFeedbackList(state.authenticatedUser.feedbacks, feedbackId);
    } else {
      state.feedbacks = filterReplyList(state.feedbacks, parentFeedbackId, feedbackId);
      state.authenticatedUser.feedbacks = filterReplyList(state.authenticatedUser.feedbacks, parentFeedbackId, feedbackId);
    }
  }
};
var actions = {
  loadFeedbackUser: function loadFeedbackUser(_ref2, _ref3) {
    var commit = _ref2.commit;
    var itemId = _ref3.itemId,
      variationId = _ref3.variationId;
    if (!loadFeedbackUserLock) {
      loadFeedbackUserLock = true;
      var itemString = '';
      if (itemId !== undefined && variationId !== undefined) {
        itemString = "/".concat(itemId, "/").concat(variationId);
      }
      return $.ajax({
        type: 'GET',
        url: '/rest/feedbacks/user' + itemString,
        success: function success(data) {
          commit('setFeedbackAuthenticatedUser', data);
          loadFeedbackUserLock = false;
        },
        error: function error(jqXHR, textStatus, errorThrown) {
          loadFeedbackUserLock = false;
          console.error(errorThrown);
        }
      });
    }
  },
  loadFeedbackCounts: function loadFeedbackCounts(_ref4, itemId) {
    var commit = _ref4.commit,
      state = _ref4.state;
    if (!countsLoaded) {
      countsLoaded = true;
      return $.ajax({
        type: 'GET',
        url: '/rest/feedbacks/feedback/helper/counts/' + itemId,
        success: function success(data) {
          commit('setFeedbackCounts', data.counts);
        },
        error: function error(jqXHR, textStatus, errorThrown) {
          console.error(errorThrown);
        }
      });
    }
  },
  loadPaginatedFeedbacks: function loadPaginatedFeedbacks(_ref5, _ref6) {
    var commit = _ref5.commit,
      state = _ref5.state;
    var itemId = _ref6.itemId,
      feedbacksPerPage = _ref6.feedbacksPerPage;
    if (!loadPaginatedFeedbacksLock) {
      loadPaginatedFeedbacksLock = true;
      var request = $.ajax({
        type: 'GET',
        url: '/rest/feedbacks/feedback/helper/feedbacklist/' + itemId + '/' + state.pagination.currentPage,
        data: {
          feedbacksPerPage: feedbacksPerPage
        },
        success: function success(data) {
          commit('setFeedbacks', data.feedbacks);
          commit('setFeedbackItemAttributes', data.itemAttributes);
          commit('setFeedbackPagination', data.pagination);
          loadPaginatedFeedbacksLock = false;
        },
        error: function error(jqXHR, textStatus, errorThrown) {
          console.error(errorThrown);
          loadPaginatedFeedbacksLock = false;
        }
      });
      commit('incrementCurrentFeedbackPage');
      return request;
    }
  },
  deleteFeedback: function deleteFeedback(_ref7, _ref8) {
    var commit = _ref7.commit,
      state = _ref7.state;
    var feedbackId = _ref8.feedbackId,
      parentFeedbackId = _ref8.parentFeedbackId,
      feedback = _ref8.feedback;
    return $.ajax({
      type: 'DELETE',
      url: '/rest/feedbacks/feedback/delete/' + feedbackId,
      success: function success(data) {
        commit('deleteFeedback', {
          feedbackId: feedbackId,
          parentFeedbackId: parentFeedbackId,
          feedback: feedback
        });
      }
    });
  }
};
var getters = {};
var countsLoaded = false;
/* harmony default export */ __webpack_exports__["default"] = ({
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
});

// Utility functions
function filterFeedbackList(feedbackList, feedbackId) {
  return feedbackList.filter(function (feedback) {
    return feedback.id !== feedbackId;
  });
}
function filterReplyList(feedbackList, feedbackId, replyId) {
  return feedbackList.map(function (feedback) {
    if (feedbackId === feedback.id) {
      feedback.replies = feedback.replies.filter(function (reply) {
        return reply.id !== replyId;
      });
    }
    return feedback;
  });
}
function recalculateAverage(state) {
  // Calculate average anew
  var average = 0;
  average += state.counts.ratingsCountOf5 * 5;
  average += state.counts.ratingsCountOf4 * 4;
  average += state.counts.ratingsCountOf3 * 3;
  average += state.counts.ratingsCountOf2 * 2;
  average += state.counts.ratingsCountOf1 * 1;
  average /= state.counts.ratingsCountTotal;
  state.counts.averageValue = average;
}

/***/ }),

/***/ "./resources/js/src/app/components/order/FeedbackOrder.vue":
/*!*****************************************************************!*\
  !*** ./resources/js/src/app/components/order/FeedbackOrder.vue ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FeedbackOrder_vue_vue_type_template_id_406beae6__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FeedbackOrder.vue?vue&type=template&id=406beae6 */ "./resources/js/src/app/components/order/FeedbackOrder.vue?vue&type=template&id=406beae6");
/* harmony import */ var _FeedbackOrder_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FeedbackOrder.vue?vue&type=script&lang=js */ "./resources/js/src/app/components/order/FeedbackOrder.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _FeedbackOrder_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _FeedbackOrder_vue_vue_type_template_id_406beae6__WEBPACK_IMPORTED_MODULE_0__.render,
  _FeedbackOrder_vue_vue_type_template_id_406beae6__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/order/FeedbackOrder.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/order/FeedbackOrderForm.vue":
/*!*********************************************************************!*\
  !*** ./resources/js/src/app/components/order/FeedbackOrderForm.vue ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FeedbackOrderForm_vue_vue_type_template_id_474982ca__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FeedbackOrderForm.vue?vue&type=template&id=474982ca */ "./resources/js/src/app/components/order/FeedbackOrderForm.vue?vue&type=template&id=474982ca");
/* harmony import */ var _FeedbackOrderForm_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FeedbackOrderForm.vue?vue&type=script&lang=js */ "./resources/js/src/app/components/order/FeedbackOrderForm.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _FeedbackOrderForm_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _FeedbackOrderForm_vue_vue_type_template_id_474982ca__WEBPACK_IMPORTED_MODULE_0__.render,
  _FeedbackOrderForm_vue_vue_type_template_id_474982ca__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/order/FeedbackOrderForm.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/order/FeedbackOrderItem.vue":
/*!*********************************************************************!*\
  !*** ./resources/js/src/app/components/order/FeedbackOrderItem.vue ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FeedbackOrderItem_vue_vue_type_template_id_713d3199__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FeedbackOrderItem.vue?vue&type=template&id=713d3199 */ "./resources/js/src/app/components/order/FeedbackOrderItem.vue?vue&type=template&id=713d3199");
/* harmony import */ var _FeedbackOrderItem_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FeedbackOrderItem.vue?vue&type=script&lang=js */ "./resources/js/src/app/components/order/FeedbackOrderItem.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _FeedbackOrderItem_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _FeedbackOrderItem_vue_vue_type_template_id_713d3199__WEBPACK_IMPORTED_MODULE_0__.render,
  _FeedbackOrderItem_vue_vue_type_template_id_713d3199__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/order/FeedbackOrderItem.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/order/FeedbackOrder.vue?vue&type=script&lang=js":
/*!*****************************************************************************************!*\
  !*** ./resources/js/src/app/components/order/FeedbackOrder.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_FeedbackOrder_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./FeedbackOrder.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/order/FeedbackOrder.vue?vue&type=script&lang=js");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_FeedbackOrder_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/order/FeedbackOrderForm.vue?vue&type=script&lang=js":
/*!*********************************************************************************************!*\
  !*** ./resources/js/src/app/components/order/FeedbackOrderForm.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_FeedbackOrderForm_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./FeedbackOrderForm.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/order/FeedbackOrderForm.vue?vue&type=script&lang=js");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_FeedbackOrderForm_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/order/FeedbackOrderItem.vue?vue&type=script&lang=js":
/*!*********************************************************************************************!*\
  !*** ./resources/js/src/app/components/order/FeedbackOrderItem.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_FeedbackOrderItem_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./FeedbackOrderItem.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/order/FeedbackOrderItem.vue?vue&type=script&lang=js");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_FeedbackOrderItem_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/order/FeedbackOrder.vue?vue&type=template&id=406beae6":
/*!***********************************************************************************************!*\
  !*** ./resources/js/src/app/components/order/FeedbackOrder.vue?vue&type=template&id=406beae6 ***!
  \***********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FeedbackOrder_vue_vue_type_template_id_406beae6__WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   staticRenderFns: function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FeedbackOrder_vue_vue_type_template_id_406beae6__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FeedbackOrder_vue_vue_type_template_id_406beae6__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./FeedbackOrder.vue?vue&type=template&id=406beae6 */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/order/FeedbackOrder.vue?vue&type=template&id=406beae6");


/***/ }),

/***/ "./resources/js/src/app/components/order/FeedbackOrderForm.vue?vue&type=template&id=474982ca":
/*!***************************************************************************************************!*\
  !*** ./resources/js/src/app/components/order/FeedbackOrderForm.vue?vue&type=template&id=474982ca ***!
  \***************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FeedbackOrderForm_vue_vue_type_template_id_474982ca__WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   staticRenderFns: function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FeedbackOrderForm_vue_vue_type_template_id_474982ca__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FeedbackOrderForm_vue_vue_type_template_id_474982ca__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./FeedbackOrderForm.vue?vue&type=template&id=474982ca */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/order/FeedbackOrderForm.vue?vue&type=template&id=474982ca");


/***/ }),

/***/ "./resources/js/src/app/components/order/FeedbackOrderItem.vue?vue&type=template&id=713d3199":
/*!***************************************************************************************************!*\
  !*** ./resources/js/src/app/components/order/FeedbackOrderItem.vue?vue&type=template&id=713d3199 ***!
  \***************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FeedbackOrderItem_vue_vue_type_template_id_713d3199__WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   staticRenderFns: function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FeedbackOrderItem_vue_vue_type_template_id_713d3199__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FeedbackOrderItem_vue_vue_type_template_id_713d3199__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./FeedbackOrderItem.vue?vue&type=template&id=713d3199 */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/order/FeedbackOrderItem.vue?vue&type=template&id=713d3199");


/***/ })

}]);
//# sourceMappingURL=feedback-4.js.map