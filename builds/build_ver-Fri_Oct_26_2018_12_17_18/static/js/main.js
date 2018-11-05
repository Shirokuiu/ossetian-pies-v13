/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./static/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	'use strict';
	
	// date and time pickers
	
	(function () {
	  var date = document.querySelector('.date-row-top');
	  var btn = document.querySelector('.page-header .top .date .date-content button');
	  var dateInput = document.querySelector('.page-header .top .date .date-content .date-pick input');
	  var timeInput = document.querySelector('.page-header .top .date .date-content .time-pick input');
	
	  date.addEventListener('click', function () {
	    this.classList.toggle('close');
	  });
	
	  $('.page-header .top .date .date-content .date-pick input').datepicker({
	    language: 'ru-RU',
	    autoPick: false,
	    format: 'dd/mm/yyyy',
	    autoHide: true
	  });
	
	  $('input.timepicker').timepicker({
	    timeFormat: 'HH:mm',
	    interval: 30,
	    defaultTime: ''
	  });
	
	  btn.addEventListener('click', function () {
	    var dateContent = date.querySelector('p');
	
	    dateContent.textContent = dateInput.value + ' в ' + timeInput.value;
	    date.classList.add('close');
	  });
	})();
	
	// good
	(function () {
	  var myBasket = document.querySelector('.my-basket');
	
	  // carts
	  var cartsWeight = document.querySelectorAll('.good__content .weight ul');
	  var cartsPrice = document.querySelectorAll('.good__content .bottom .price');
	  var cartsPersons = document.querySelectorAll('.good__content .weight .presons');
	  var headBasket = document.querySelector('.page-header .top .bkt a p');
	  var cartsCalculate = document.querySelectorAll('.good .good__content .bottom .add');
	
	  // my-basket
	  if (myBasket !== null) {
	    (function () {
	      var myBasketEmpty = myBasket.querySelector('.my-basket__empty');
	      var myBasketOrder = myBasket.querySelector('.my-basket__content-cont');
	      var myBasketOrderContent = myBasketOrder.querySelector('.my-basket__content');
	      var myBasketOrderPrice = myBasketOrder.querySelector('.my-basket__total-title p').childNodes[0];
	      var myBasketOrderCount = myBasket.querySelector('.my-basket__content-cont .count');
	
	      // templates
	      var tmpGood = document.querySelector('#goodBasket').content.querySelector('.my-basket__cart');
	
	      // add spaces from numbers
	      var addSpaceNumbers = function addSpaceNumbers(num) {
	        var newNum = num + '';
	
	        return newNum.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
	      };
	
	      // remove spaces from numbers
	      var removeSpaceNumbers = function removeSpaceNumbers(num) {
	        var newNum = num + '';
	
	        return newNum.replace(/\s/g, '');
	      };
	
	      // calculate total price
	      var calculateTotalPrice = function calculateTotalPrice(elem) {
	        var j = 0;
	
	        for (var i = 0, len = elem.length; i < len; i++) {
	          j = j + parseInt(removeSpaceNumbers(elem[i].textContent), 10);
	        };
	
	        return j;
	      };
	
	      $('.my-basket__total-order .date-pick input').datepicker({
	        language: 'ru-RU',
	        autoPick: false,
	        format: 'dd/mm/yyyy',
	        autoHide: true
	      });
	
	      headBasket.textContent = 0;
	
	      // calculate weight
	
	      var _loop = function _loop(i, len) {
	        var text = document.createTextNode('');
	        var cartsWeightItems = cartsWeight[i].querySelectorAll('li');
	
	        for (var _j3 = 0, jlen = cartsWeightItems.length; _j3 < jlen; _j3++) {
	          if (cartsWeightItems[_j3].classList.contains('active')) {
	            cartsWeight[i].dataset.currentPrice = cartsWeightItems[_j3].dataset.price;
	            cartsPersons[i].textContent = 'На ' + cartsWeightItems[_j3].dataset.persons + ' персон';
	          };
	        };
	
	        cartsPrice[i].insertBefore(text, cartsPrice[i].children[0]);
	        cartsPrice[i].childNodes[0].textContent = addSpaceNumbers(cartsWeight[i].dataset.currentPrice);
	
	        cartsWeight[i].addEventListener('click', function (evt) {
	          var par = this.closest('.good');
	          var items = evt.target.closest('li');
	          var price = par.querySelector('.good__content .bottom .price').childNodes[0];
	          var persons = par.querySelector('.good__content .weight .presons');
	          var add = par.querySelector('.good__content .bottom .add');
	
	          if (items) {
	            if (!items.classList.contains('active')) {
	              for (var _j4 = 0, _jlen2 = cartsWeightItems.length; _j4 < _jlen2; _j4++) {
	                cartsWeightItems[_j4].classList.remove('active');
	                add.classList.add('close');
	              };
	              items.classList.add('active');
	              price.textContent = items.dataset.price;
	              persons.textContent = 'На ' + items.dataset.persons + ' персон';
	            };
	          };
	        });
	      };
	
	      for (var i = 0, len = cartsWeight.length; i < len; i++) {
	        _loop(i, len);
	      };
	
	      // calculate, add carts
	      for (var i = 0, len = cartsCalculate.length; i < len; i++) {
	        cartsCalculate[i].addEventListener('click', function (evt) {
	          var _this = this;
	
	          var par = this.closest('.good .good__content');
	          var btn = evt.target.closest('.add-button');
	          var minus = evt.target.closest('.calculate button.minus');
	          var val = this.querySelector('.calculate p');
	          var plus = evt.target.closest('.calculate button.plus');
	          var currentPrice = par.querySelector('.weight ul').dataset.currentPrice;
	          var price = par.querySelector('.bottom .price').childNodes[0];
	          var cartTitle = par.querySelector('a');
	
	          if (btn) {
	            (function () {
	              var newGood = tmpGood.cloneNode(true);
	              var text = document.createTextNode('');
	              var newGoodCalc = newGood.querySelectorAll('.my-basket__calc');
	
	              newGood.querySelector('.my-basket__price').insertBefore(text, newGood.querySelector('.my-basket__price').children[0]);
	
	              _this.classList.remove('close');
	              headBasket.textContent = parseInt(headBasket.textContent, 10) + 1;
	
	              myBasketEmpty.classList.add('close');
	              myBasketOrder.classList.remove('close');
	              newGood.querySelector('.my-basket__cart-title').textContent = cartTitle.textContent;
	              newGood.querySelector('.my-basket__price').childNodes[0].textContent = price.textContent;
	              newGood.dataset.currentPrice = newGood.querySelector('.my-basket__price').childNodes[0].textContent;
	              myBasketOrderCount.textContent = headBasket.textContent;
	
	              myBasketOrderContent.appendChild(newGood);
	
	              var myBasketGoodsPrice = myBasketOrder.querySelectorAll('.my-basket__price');
	
	              myBasketOrderPrice.textContent = addSpaceNumbers(calculateTotalPrice(myBasketGoodsPrice));
	
	              for (var _j = 0, jlen = newGoodCalc.length; _j < jlen; _j++) {
	                newGoodCalc[_j].addEventListener('click', function (e) {
	                  var calcGPar = this.closest('.my-basket__content-cont');
	                  var calcPar = this.closest('.my-basket__cart-row');
	                  var calcMinus = e.target.closest('button.minus');
	                  var calcVal = this.querySelector('p');
	                  var calcPlus = e.target.closest('button.plus');
	                  var calcPrice = calcPar.querySelector('.my-basket__price').childNodes[0];
	                  var caclTotalPrice = calcGPar.querySelector('.my-basket__total-title p').childNodes[0];
	                  var calcItemsPrice = calcGPar.querySelectorAll('.my-basket__price');
	
	                  if (calcMinus) {
	                    if (parseInt(calcVal.textContent, 10) > 1) {
	                      calcVal.textContent = parseInt(calcVal.textContent, 10) - 1;
	                      calcPrice.textContent = addSpaceNumbers(parseInt(removeSpaceNumbers(calcPrice.textContent), 10) - parseInt(removeSpaceNumbers(newGood.dataset.currentPrice), 10));
	                      myBasketOrderPrice.textContent = addSpaceNumbers(calculateTotalPrice(calcItemsPrice));
	                    }
	                  };
	
	                  if (calcPlus) {
	                    calcVal.textContent = parseInt(calcVal.textContent, 10) + 1;
	                    calcPrice.textContent = addSpaceNumbers(parseInt(removeSpaceNumbers(calcPrice.textContent), 10) + parseInt(removeSpaceNumbers(newGood.dataset.currentPrice), 10));
	                    myBasketOrderPrice.textContent = addSpaceNumbers(calculateTotalPrice(calcItemsPrice));
	                  };
	                });
	              };
	
	              newGood.addEventListener('click', function (e) {
	                var globPar = this.closest('.my-basket__content-cont');
	                var exit = e.target.closest('.exit');
	                var itemPrice = this.querySelector('.my-basket__price').childNodes[0];
	                var globItems = globPar.querySelectorAll('.my-basket__cart');
	                var globItemsPrice = globPar.querySelectorAll('.my-basket__price');
	
	                if (exit) {
	                  this.remove();
	                  itemPrice.textContent = 0;
	                  myBasketOrderPrice.textContent = calculateTotalPrice(globItemsPrice);
	
	                  headBasket.textContent = parseInt(headBasket.textContent, 10) - 1;
	                  myBasketOrderCount.textContent = headBasket.textContent;
	
	                  if (globItems.length === 1) {
	                    myBasketEmpty.classList.remove('close');
	                    myBasketOrder.classList.add('close');
	
	                    for (var _j2 = 0, _jlen = cartsCalculate.length; _j2 < _jlen; _j2++) {
	                      cartsCalculate[_j2].classList.add('close');
	                    };
	
	                    headBasket.textContent = 0;
	                  }
	                };
	              });
	            })();
	          };
	
	          if (minus) {
	            if (parseInt(val.textContent, 10) > 1) {
	              val.textContent = parseInt(val.textContent, 10) - 1;
	              price.textContent = addSpaceNumbers(parseInt(removeSpaceNumbers(price.textContent), 10) - parseInt(removeSpaceNumbers(currentPrice), 10));
	              headBasket.textContent = parseInt(headBasket.textContent, 10) - 1;
	              myBasketOrderCount.textContent = headBasket.textContent;
	            };
	          };
	
	          if (plus) {
	            val.textContent = parseInt(val.textContent, 10) + 1;
	            price.textContent = addSpaceNumbers(parseInt(removeSpaceNumbers(price.textContent), 10) + parseInt(removeSpaceNumbers(currentPrice), 10));
	            headBasket.textContent = parseInt(headBasket.textContent, 10) + 1;
	            myBasketOrderCount.textContent = headBasket.textContent;
	          };
	        });
	      };
	    })();
	  };
	})();
	
	// inner-cart
	(function () {
	  var innerCart = document.querySelector('.inner-cart');
	  var myBasketOrderCount = document.querySelector('.my-basket__content-cont .count');
	
	  // add spaces from numbers
	  var addSpaceNumbers = function addSpaceNumbers(num) {
	    var newNum = num + '';
	
	    return newNum.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
	  };
	
	  // remove spaces from numbers
	  var removeSpaceNumbers = function removeSpaceNumbers(num) {
	    var newNum = num + '';
	
	    return newNum.replace(/\s/g, '');
	  };
	
	  // calculate total price
	  var calculateTotalPrice = function calculateTotalPrice(elem) {
	    var j = 0;
	
	    for (var i = 0, len = elem.length; i < len; i++) {
	      j = j + parseInt(removeSpaceNumbers(elem[i].textContent), 10);
	    };
	
	    return j;
	  };
	
	  if (innerCart !== null) {
	    var text = document.createTextNode('');
	    var weight = innerCart.querySelector('.row .desc .options .block-left ul');
	    var weightItems = weight.querySelectorAll('li');
	    var price = innerCart.querySelector('.row .desc .options .block-right .price');
	    var persons = innerCart.querySelector('.row .desc .options .block-left .person');
	    var add = innerCart.querySelector('.row .desc .options .block-right .add');
	    var headBasket = document.querySelector('.page-header .top .bkt a p');
	    var tmpGood = document.querySelector('#goodBasket').content.querySelector('.my-basket__cart');
	    var myBasketEmpty = document.querySelector('.my-basket__empty');
	    var myBasketOrder = document.querySelector('.my-basket__content-cont');
	    var myBasketOrderContent = myBasketOrder.querySelector('.my-basket__content');
	    var myBasketOrderPrice = myBasketOrder.querySelector('.my-basket__total-title p').childNodes[0];
	
	    price.insertBefore(text, price.children[0]);
	
	    for (var i = 0, len = weightItems.length; i < len; i++) {
	      if (weightItems[i].classList.contains('active')) {
	        weight.dataset.currentPrice = weightItems[i].dataset.price;
	        weight.dataset.persons = weightItems[i].dataset.persons;
	        price.childNodes[0].textContent = weight.dataset.currentPrice;
	        persons.textContent = 'На ' + weight.dataset.persons + ' персон';
	      };
	    };
	
	    weight.addEventListener('click', function (evt) {
	      var par = this.closest('.inner-cart .row .desc .options');
	      var item = evt.target.closest('li');
	      var calcVal = par.querySelector('.inner-cart .row .desc .options .block-right .add .calculate p');
	      var calcAdd = par.querySelector('.inner-cart .row .desc .options .block-right .add');
	
	      if (item) {
	        if (!item.classList.contains('active')) {
	          for (var _i = 0, _len = weightItems.length; _i < _len; _i++) {
	            weightItems[_i].classList.remove('active');
	          };
	          item.classList.add('active');
	          weight.dataset.currentPrice = item.dataset.price;
	          weight.dataset.persons = item.dataset.persons;
	          price.childNodes[0].textContent = weight.dataset.currentPrice;
	          persons.textContent = 'На ' + weight.dataset.persons + ' персон';
	          calcVal.textContent = 1;
	          calcAdd.classList.add('close');
	        };
	      };
	    });
	
	    add.addEventListener('click', function (evt) {
	      var _this2 = this;
	
	      var parG = this.closest('.page-content__desc');
	      var par = this.closest('.inner-cart .row .desc .options');
	      var btn = evt.target.closest('.add-button');
	      var minus = evt.target.closest('.calculate button.minus');
	      var val = this.querySelector('.calculate p');
	      var plus = evt.target.closest('.calculate button.plus');
	      var currentPrice = par.querySelector('.inner-cart .row .desc .options .block-left ul').dataset.currentPrice;
	      var price = par.querySelector('.inner-cart .row .desc .options .block-right .price').childNodes[0];
	      var title = parG.querySelector('.inner-titel-js');
	
	      if (btn) {
	        (function () {
	          var newGood = tmpGood.cloneNode(true);
	          var newGoodCalc = newGood.querySelectorAll('.my-basket__calc');
	
	          _this2.classList.remove('close');
	          headBasket.textContent = parseInt(headBasket.textContent, 10) + 1;
	          myBasketEmpty.classList.add('close');
	          myBasketOrder.classList.remove('close');
	          newGood.querySelector('.my-basket__cart-title').textContent = title.textContent;
	          newGood.querySelector('.my-basket__price').childNodes[0].textContent = price.textContent;
	          newGood.dataset.currentPrice = newGood.querySelector('.my-basket__price').childNodes[0].textContent;
	
	          myBasketOrderContent.appendChild(newGood);
	
	          var myBasketGoodsPrice = myBasketOrder.querySelectorAll('.my-basket__price');
	
	          myBasketOrderCount.textContent = headBasket.textContent;
	          myBasketOrderPrice.textContent = addSpaceNumbers(calculateTotalPrice(myBasketGoodsPrice));
	
	          for (var _j5 = 0, jlen = newGoodCalc.length; _j5 < jlen; _j5++) {
	            newGoodCalc[_j5].addEventListener('click', function (e) {
	              var calcGPar = this.closest('.my-basket__content-cont');
	              var calcPar = this.closest('.my-basket__cart-row');
	              var calcMinus = e.target.closest('button.minus');
	              var calcVal = this.querySelector('p');
	              var calcPlus = e.target.closest('button.plus');
	              var calcPrice = calcPar.querySelector('.my-basket__price').childNodes[0];
	              var caclTotalPrice = calcGPar.querySelector('.my-basket__total-title p').childNodes[0];
	              var calcItemsPrice = calcGPar.querySelectorAll('.my-basket__price');
	
	              if (calcMinus) {
	                if (parseInt(calcVal.textContent, 10) > 1) {
	                  calcVal.textContent = parseInt(calcVal.textContent, 10) - 1;
	                  calcPrice.textContent = addSpaceNumbers(parseInt(removeSpaceNumbers(calcPrice.textContent), 10) - parseInt(removeSpaceNumbers(newGood.dataset.currentPrice), 10));
	                  myBasketOrderPrice.textContent = addSpaceNumbers(calculateTotalPrice(calcItemsPrice));
	                }
	              };
	
	              if (calcPlus) {
	                calcVal.textContent = parseInt(calcVal.textContent, 10) + 1;
	                calcPrice.textContent = addSpaceNumbers(parseInt(removeSpaceNumbers(calcPrice.textContent), 10) + parseInt(removeSpaceNumbers(newGood.dataset.currentPrice), 10));
	                myBasketOrderPrice.textContent = addSpaceNumbers(calculateTotalPrice(calcItemsPrice));
	              };
	            });
	          };
	
	          newGood.addEventListener('click', function (e) {
	            var globPar = this.closest('.my-basket__content-cont');
	            var exit = e.target.closest('.exit');
	            var itemPrice = this.querySelector('.my-basket__price').childNodes[0];
	            var globItems = globPar.querySelectorAll('.my-basket__cart');
	            var globItemsPrice = globPar.querySelectorAll('.my-basket__price');
	
	            if (exit) {
	              this.remove();
	              itemPrice.textContent = 0;
	              myBasketOrderPrice.textContent = calculateTotalPrice(globItemsPrice);
	
	              headBasket.textContent = parseInt(headBasket.textContent, 10) - 1;
	              myBasketOrderCount.textContent = headBasket.textContent;
	
	              if (globItems.length === 1) {
	                myBasketEmpty.classList.remove('close');
	                myBasketOrder.classList.add('close');
	
	                for (var _j6 = 0, _jlen3 = cartsCalculate.length; _j6 < _jlen3; _j6++) {
	                  cartsCalculate[_j6].classList.add('close');
	                };
	
	                headBasket.textContent = 0;
	              }
	            };
	          });
	        })();
	      };
	
	      if (minus) {
	        if (parseInt(val.textContent, 10) > 1) {
	          val.textContent = parseInt(val.textContent, 10) - 1;
	          price.textContent = addSpaceNumbers(parseInt(removeSpaceNumbers(price.textContent), 10) - parseInt(removeSpaceNumbers(currentPrice), 10));
	          headBasket.textContent = parseInt(headBasket.textContent, 10) - 1;
	          myBasketOrderCount.textContent = headBasket.textContent;
	        }
	      };
	
	      if (plus) {
	        val.textContent = parseInt(val.textContent, 10) + 1;
	        price.textContent = addSpaceNumbers(parseInt(removeSpaceNumbers(price.textContent), 10) + parseInt(removeSpaceNumbers(currentPrice), 10));
	        headBasket.textContent = parseInt(headBasket.textContent, 10) + 1;
	        myBasketOrderCount.textContent = headBasket.textContent;
	      };
	    });
	  };
	})();
	
	// basket
	(function () {
	  var basket = document.querySelector('.inner-basket');
	
	  if (basket !== null) {
	    (function () {
	      var privacy = basket.querySelector('.inner-basket__order .basket-form .privacy span');
	      var privacyInput = basket.querySelector('.inner-basket__order .basket-form .privacy input');
	      var basketItems = basket.querySelectorAll('.inner-basket__table .items li');
	      var basketItemsTotal = basket.querySelectorAll('.inner-basket__table .items li .total p');
	      var basketItemsCurrentPrice = basket.querySelectorAll('.inner-basket__table .items li .price');
	      var basketTotalPrice = basket.querySelector('.inner-basket__table .sum p');
	      var basketCalc = basket.querySelectorAll('.inner-basket__table .items li .calculate-wrap .calculate');
	
	      // add spaces from numbers
	      var addSpaceNumbers = function addSpaceNumbers(num) {
	        var newNum = num + '';
	
	        return newNum.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
	      };
	
	      // remove spaces from numbers
	      var removeSpaceNumbers = function removeSpaceNumbers(num) {
	        var newNum = num + '';
	
	        return newNum.replace(/\s/g, '');
	      };
	
	      // calculate total price
	      var calculateTotalPrice = function calculateTotalPrice(elem) {
	        var j = 0;
	
	        for (var i = 0, len = elem.length; i < len; i++) {
	          j = j + parseInt(removeSpaceNumbers(elem[i].textContent), 10);
	        };
	
	        return j;
	      };
	
	      privacy.addEventListener('click', function () {
	        if (privacyInput.hasAttribute('checked')) {
	          privacyInput.removeAttribute('checked', '');
	        } else {
	          privacyInput.setAttribute('checked', '');
	        };
	      });
	
	      $('.inner-basket__order .basket-form .row .block-input ul:nth-child(2) li:nth-child(1) input').datepicker({
	        language: 'ru-RU',
	        autoPick: false,
	        format: 'dd/mm/yyyy',
	        autoHide: true
	      });
	
	      $('.inner-basket__order .basket-form .row .block-input ul:nth-child(2) li:nth-child(2) input').timepicker({
	        timeFormat: 'HH:mm',
	        interval: 30,
	        defaultTime: ''
	      });
	
	      // add prices
	      for (var i = 0, len = basketItemsTotal.length; i < len; i++) {
	        var _text = document.createTextNode('');
	
	        basketItemsTotal[i].insertBefore(_text, basketItemsTotal[i].children[0]);
	        basketItemsTotal[i].childNodes[0].textContent = basketItemsCurrentPrice[i].childNodes[0].textContent;
	      };
	
	      // add total price
	      var text = document.createTextNode('');
	
	      basketTotalPrice.insertBefore(text, basketTotalPrice.children[0]);
	      basketTotalPrice.childNodes[0].textContent = addSpaceNumbers(calculateTotalPrice(basketItemsTotal));
	
	      // calculate
	      for (var _i2 = 0, _len2 = basketCalc.length; _i2 < _len2; _i2++) {
	        basketCalc[_i2].addEventListener('click', function (evt) {
	          var par = this.closest('.inner-basket__table .items li');
	          var minus = evt.target.closest('.inner-basket__table .items li .calculate-wrap .calculate button.minus');
	          var val = this.querySelector('.inner-basket__table .items li .calculate-wrap .calculate p');
	          var plus = evt.target.closest('.inner-basket__table .items li .calculate-wrap .calculate button.plus');
	          var currentPrice = par.querySelector('.inner-basket__table .items li .price');
	          var totalPrice = par.querySelector('.inner-basket__table .items li .total p');
	
	          if (minus) {
	            if (parseInt(val.textContent, 10) > 1) {
	              val.textContent = parseInt(val.textContent, 10) - 1;
	              totalPrice.childNodes[0].textContent = addSpaceNumbers(parseInt(removeSpaceNumbers(totalPrice.childNodes[0].textContent), 10) - parseInt(removeSpaceNumbers(currentPrice.childNodes[0].textContent), 10));
	              basketTotalPrice.childNodes[0].textContent = addSpaceNumbers(parseInt(removeSpaceNumbers(basketTotalPrice.childNodes[0].textContent), 10) - parseInt(currentPrice.textContent, 10));
	            };
	          };
	
	          if (plus) {
	            val.textContent = parseInt(val.textContent, 10) + 1;
	            totalPrice.childNodes[0].textContent = addSpaceNumbers(parseInt(removeSpaceNumbers(totalPrice.childNodes[0].textContent), 10) + parseInt(removeSpaceNumbers(currentPrice.childNodes[0].textContent), 10));
	            basketTotalPrice.childNodes[0].textContent = addSpaceNumbers(parseInt(removeSpaceNumbers(basketTotalPrice.childNodes[0].textContent), 10) + parseInt(currentPrice.textContent, 10));
	          };
	        });
	      };
	
	      // remove
	      for (var _i3 = 0, _len3 = basketItems.length; _i3 < _len3; _i3++) {
	        basketItems[_i3].addEventListener('click', function (evt) {
	          var exit = evt.target.closest('.inner-basket__table .items li .exit');
	          var itemTotalPrice = this.querySelector('.inner-basket__table .items li .total p').childNodes[0];
	
	          if (exit) {
	            this.remove();
	            itemTotalPrice.textContent = 0;
	            basketTotalPrice.childNodes[0].textContent = addSpaceNumbers(calculateTotalPrice(basketItemsTotal));
	          }
	        });
	      };
	    })();
	  };
	})();
	
	// animation add
	(function () {
	  // где
	  // .good__content .bottom .add.close .add-button - кнопка добавить в корзину
	  // .good .img img - картинка которая будет использоваться при анимации
	  // .my-basket - корзина куда будет лететь картинка
	
	  $(".good__content .bottom .add.close .add-button").on("click", function () {
	    $(".good .img img").clone().css({ 'position': 'absolute', 'z-index': '11100', width: '100px', top: $(this).offset().top - 50, left: $(this).offset().left + 50 }).appendTo("body").animate({ opacity: 0.05,
	      left: $(".my-basket").offset()['left'],
	      top: $(".my-basket").offset()['top'],
	      width: 20 }, 1000, function () {
	      $(this).remove();
	    });
	  });
	
	  $(".inner-cart .row .desc .options .block-right .add.close .add-button").on("click", function () {
	    $(".inner-cart .row .img img").clone().css({ 'position': 'absolute', 'z-index': '11100', width: '100px', top: $(this).offset().top - 50, left: $(this).offset().left + 50 }).appendTo("body").animate({ opacity: 0.05,
	      left: $(".my-basket").offset()['left'],
	      top: $(".my-basket").offset()['top'],
	      width: 20 }, 1000, function () {
	      $(this).remove();
	    });
	  });
	})();
	
	// nav slider
	(function () {
	  var slider = document.querySelector('.nav-slider__content');
	
	  if (slider !== null) {
	    $(document).ready(function () {
	      $(".nav-slider__content").owlCarousel({
	        slideTransition: 'ease',
	        smartSpeed: 200,
	        autoplay: false,
	        nav: true,
	        dots: false,
	        responsive: {
	          1700: {
	            items: 10,
	            margin: 10
	          },
	          1620: {
	            items: 9,
	            margin: 10
	          },
	          1420: {
	            items: 8,
	            margin: 10
	          },
	          1100: {
	            items: 7,
	            margin: 10
	          },
	          1000: {
	            items: 6,
	            margin: 10
	          },
	          770: {
	            items: 5,
	            margin: 10
	          },
	          560: {
	            items: 3,
	            margin: 10
	          },
	          460: {
	            items: 2,
	            margin: 10
	          },
	          320: {
	            items: 1,
	            margin: 0
	          }
	        }
	      });
	    });
	  }
	})();
	
	// slider-recomend
	(function () {
	  var slider = document.querySelector('.slider-recomend .slider');
	
	  if (slider !== null) {
	    $(document).ready(function () {
	      $(".slider-recomend .slider").owlCarousel({
	        slideTransition: 'ease',
	        smartSpeed: 200,
	        autoplay: false,
	        nav: true,
	        dots: false,
	        responsive: {
	          1820: {
	            items: 2,
	            margin: 19,
	            stagePadding: 210
	          },
	          1710: {
	            items: 2,
	            margin: 19,
	            stagePadding: 150
	          },
	          1600: {
	            items: 2,
	            margin: 19,
	            stagePadding: 100
	          },
	          1520: {
	            items: 2,
	            margin: 19,
	            stagePadding: 70
	          },
	          1380: {
	            items: 1,
	            margin: 19,
	            stagePadding: 200
	          },
	          1020: {
	            items: 1,
	            margin: 19,
	            stagePadding: 200
	          },
	          870: {
	            items: 1,
	            margin: 19,
	            stagePadding: 100
	          },
	          730: {
	            items: 1,
	            margin: 19,
	            stagePadding: 70
	          },
	          320: {
	            items: 1,
	            margin: 0,
	            stagePadding: 0
	          }
	        }
	      });
	    });
	  }
	})();

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYTJkZWE3NzJjZDEwZjVhMWJhMjAiLCJ3ZWJwYWNrOi8vLy4vbWFya3VwL3N0YXRpYy9qcy9tYWluLmpzIl0sIm5hbWVzIjpbImRhdGUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJidG4iLCJkYXRlSW5wdXQiLCJ0aW1lSW5wdXQiLCJhZGRFdmVudExpc3RlbmVyIiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwiJCIsImRhdGVwaWNrZXIiLCJsYW5ndWFnZSIsImF1dG9QaWNrIiwiZm9ybWF0IiwiYXV0b0hpZGUiLCJ0aW1lcGlja2VyIiwidGltZUZvcm1hdCIsImludGVydmFsIiwiZGVmYXVsdFRpbWUiLCJkYXRlQ29udGVudCIsInRleHRDb250ZW50IiwidmFsdWUiLCJhZGQiLCJteUJhc2tldCIsImNhcnRzV2VpZ2h0IiwicXVlcnlTZWxlY3RvckFsbCIsImNhcnRzUHJpY2UiLCJjYXJ0c1BlcnNvbnMiLCJoZWFkQmFza2V0IiwiY2FydHNDYWxjdWxhdGUiLCJteUJhc2tldEVtcHR5IiwibXlCYXNrZXRPcmRlciIsIm15QmFza2V0T3JkZXJDb250ZW50IiwibXlCYXNrZXRPcmRlclByaWNlIiwiY2hpbGROb2RlcyIsIm15QmFza2V0T3JkZXJDb3VudCIsInRtcEdvb2QiLCJjb250ZW50IiwiYWRkU3BhY2VOdW1iZXJzIiwibnVtIiwibmV3TnVtIiwicmVwbGFjZSIsInJlbW92ZVNwYWNlTnVtYmVycyIsImNhbGN1bGF0ZVRvdGFsUHJpY2UiLCJlbGVtIiwiaiIsImkiLCJsZW4iLCJsZW5ndGgiLCJwYXJzZUludCIsInRleHQiLCJjcmVhdGVUZXh0Tm9kZSIsImNhcnRzV2VpZ2h0SXRlbXMiLCJqbGVuIiwiY29udGFpbnMiLCJkYXRhc2V0IiwiY3VycmVudFByaWNlIiwicHJpY2UiLCJwZXJzb25zIiwiaW5zZXJ0QmVmb3JlIiwiY2hpbGRyZW4iLCJldnQiLCJwYXIiLCJjbG9zZXN0IiwiaXRlbXMiLCJ0YXJnZXQiLCJyZW1vdmUiLCJtaW51cyIsInZhbCIsInBsdXMiLCJjYXJ0VGl0bGUiLCJuZXdHb29kIiwiY2xvbmVOb2RlIiwibmV3R29vZENhbGMiLCJhcHBlbmRDaGlsZCIsIm15QmFza2V0R29vZHNQcmljZSIsImUiLCJjYWxjR1BhciIsImNhbGNQYXIiLCJjYWxjTWludXMiLCJjYWxjVmFsIiwiY2FsY1BsdXMiLCJjYWxjUHJpY2UiLCJjYWNsVG90YWxQcmljZSIsImNhbGNJdGVtc1ByaWNlIiwiZ2xvYlBhciIsImV4aXQiLCJpdGVtUHJpY2UiLCJnbG9iSXRlbXMiLCJnbG9iSXRlbXNQcmljZSIsImlubmVyQ2FydCIsIndlaWdodCIsIndlaWdodEl0ZW1zIiwiaXRlbSIsImNhbGNBZGQiLCJwYXJHIiwidGl0bGUiLCJiYXNrZXQiLCJwcml2YWN5IiwicHJpdmFjeUlucHV0IiwiYmFza2V0SXRlbXMiLCJiYXNrZXRJdGVtc1RvdGFsIiwiYmFza2V0SXRlbXNDdXJyZW50UHJpY2UiLCJiYXNrZXRUb3RhbFByaWNlIiwiYmFza2V0Q2FsYyIsImhhc0F0dHJpYnV0ZSIsInJlbW92ZUF0dHJpYnV0ZSIsInNldEF0dHJpYnV0ZSIsInRvdGFsUHJpY2UiLCJpdGVtVG90YWxQcmljZSIsIm9uIiwiY2xvbmUiLCJjc3MiLCJ3aWR0aCIsInRvcCIsIm9mZnNldCIsImxlZnQiLCJhcHBlbmRUbyIsImFuaW1hdGUiLCJvcGFjaXR5Iiwic2xpZGVyIiwicmVhZHkiLCJvd2xDYXJvdXNlbCIsInNsaWRlVHJhbnNpdGlvbiIsInNtYXJ0U3BlZWQiLCJhdXRvcGxheSIsIm5hdiIsImRvdHMiLCJyZXNwb25zaXZlIiwibWFyZ2luIiwic3RhZ2VQYWRkaW5nIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFF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LFlBckJJO0FBMEJWLGlCQUFNO0FBQ0psRSxvQkFBTyxDQURIO0FBRUppRSxxQkFBUSxFQUZKO0FBR0pDLDJCQUFjO0FBSFYsWUExQkk7QUErQlYsZ0JBQUs7QUFDSGxFLG9CQUFPLENBREo7QUFFSGlFLHFCQUFRLEVBRkw7QUFHSEMsMkJBQWM7QUFIWCxZQS9CSztBQW9DVixnQkFBSztBQUNIbEUsb0JBQU8sQ0FESjtBQUVIaUUscUJBQVEsRUFGTDtBQUdIQywyQkFBYztBQUhYLFlBcENLO0FBeUNWLGdCQUFLO0FBQ0hsRSxvQkFBTyxDQURKO0FBRUhpRSxxQkFBUSxDQUZMO0FBR0hDLDJCQUFjO0FBSFg7QUF6Q0s7QUFONEIsUUFBMUM7QUFzREQsTUF2REQ7QUF3REQ7QUFDRixFQTdERCxJIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIuL3N0YXRpYy9qcy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBhMmRlYTc3MmNkMTBmNWExYmEyMCIsIid1c2Ugc3RyaWN0JztcblxuLy8gZGF0ZSBhbmQgdGltZSBwaWNrZXJzXG4oZnVuY3Rpb24gKCkge1xuICBjb25zdCBkYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhdGUtcm93LXRvcCcpO1xuICBjb25zdCBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnZS1oZWFkZXIgLnRvcCAuZGF0ZSAuZGF0ZS1jb250ZW50IGJ1dHRvbicpO1xuICBjb25zdCBkYXRlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnZS1oZWFkZXIgLnRvcCAuZGF0ZSAuZGF0ZS1jb250ZW50IC5kYXRlLXBpY2sgaW5wdXQnKTtcbiAgY29uc3QgdGltZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2UtaGVhZGVyIC50b3AgLmRhdGUgLmRhdGUtY29udGVudCAudGltZS1waWNrIGlucHV0Jyk7XG4gIFxuICBkYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZSgnY2xvc2UnKTtcbiAgfSk7XG4gIFxuICAkKCcucGFnZS1oZWFkZXIgLnRvcCAuZGF0ZSAuZGF0ZS1jb250ZW50IC5kYXRlLXBpY2sgaW5wdXQnKS5kYXRlcGlja2VyKHtcbiAgICBsYW5ndWFnZTogJ3J1LVJVJyxcbiAgICBhdXRvUGljazogZmFsc2UsXG4gICAgZm9ybWF0OiAnZGQvbW0veXl5eScsXG4gICAgYXV0b0hpZGU6IHRydWVcbiAgfSk7XG4gIFxuICAkKCdpbnB1dC50aW1lcGlja2VyJykudGltZXBpY2tlcih7XG4gICAgdGltZUZvcm1hdDogJ0hIOm1tJyxcbiAgICBpbnRlcnZhbDogMzAsXG4gICAgZGVmYXVsdFRpbWU6ICcnLFxuICB9KTtcbiAgXG4gIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgZGF0ZUNvbnRlbnQgPSBkYXRlLnF1ZXJ5U2VsZWN0b3IoJ3AnKTtcbiAgICBcbiAgICBkYXRlQ29udGVudC50ZXh0Q29udGVudCA9IGRhdGVJbnB1dC52YWx1ZSArICcg0LIgJyArIHRpbWVJbnB1dC52YWx1ZTtcbiAgICBkYXRlLmNsYXNzTGlzdC5hZGQoJ2Nsb3NlJyk7XG4gIH0pO1xufSkoKTtcblxuLy8gZ29vZFxuKGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgbXlCYXNrZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubXktYmFza2V0Jyk7XG4gIFxuICAvLyBjYXJ0c1xuICBjb25zdCBjYXJ0c1dlaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5nb29kX19jb250ZW50IC53ZWlnaHQgdWwnKTtcbiAgY29uc3QgY2FydHNQcmljZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5nb29kX19jb250ZW50IC5ib3R0b20gLnByaWNlJyk7XG4gIGNvbnN0IGNhcnRzUGVyc29ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5nb29kX19jb250ZW50IC53ZWlnaHQgLnByZXNvbnMnKTtcbiAgY29uc3QgaGVhZEJhc2tldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdlLWhlYWRlciAudG9wIC5ia3QgYSBwJyk7XG4gIGNvbnN0IGNhcnRzQ2FsY3VsYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdvb2QgLmdvb2RfX2NvbnRlbnQgLmJvdHRvbSAuYWRkJyk7XG4gIFxuICAvLyBteS1iYXNrZXRcbiAgaWYgKG15QmFza2V0ICE9PSBudWxsKSB7XG4gICAgY29uc3QgbXlCYXNrZXRFbXB0eSA9IG15QmFza2V0LnF1ZXJ5U2VsZWN0b3IoJy5teS1iYXNrZXRfX2VtcHR5Jyk7XG4gICAgY29uc3QgbXlCYXNrZXRPcmRlciA9IG15QmFza2V0LnF1ZXJ5U2VsZWN0b3IoJy5teS1iYXNrZXRfX2NvbnRlbnQtY29udCcpO1xuICAgIGNvbnN0IG15QmFza2V0T3JkZXJDb250ZW50ID0gbXlCYXNrZXRPcmRlci5xdWVyeVNlbGVjdG9yKCcubXktYmFza2V0X19jb250ZW50Jyk7XG4gICAgY29uc3QgbXlCYXNrZXRPcmRlclByaWNlID0gbXlCYXNrZXRPcmRlci5xdWVyeVNlbGVjdG9yKCcubXktYmFza2V0X190b3RhbC10aXRsZSBwJykuY2hpbGROb2Rlc1swXTtcbiAgICBjb25zdCBteUJhc2tldE9yZGVyQ291bnQgPSBteUJhc2tldC5xdWVyeVNlbGVjdG9yKCcubXktYmFza2V0X19jb250ZW50LWNvbnQgLmNvdW50Jyk7XG4gICAgXG4gICAgLy8gdGVtcGxhdGVzXG4gICAgY29uc3QgdG1wR29vZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNnb29kQmFza2V0JykuY29udGVudC5xdWVyeVNlbGVjdG9yKCcubXktYmFza2V0X19jYXJ0Jyk7XG4gIFxuICAgIC8vIGFkZCBzcGFjZXMgZnJvbSBudW1iZXJzXG4gICAgICBjb25zdCBhZGRTcGFjZU51bWJlcnMgPSBmdW5jdGlvbiAobnVtKSB7XG4gICAgICAgIGxldCBuZXdOdW0gPSBudW0gKyAnJztcblxuICAgICAgICByZXR1cm4gbmV3TnVtLnJlcGxhY2UoLyhcXGQpKD89KFxcZFxcZFxcZCkrKFteXFxkXXwkKSkvZywgJyQxICcpO1xuICAgICAgfTtcblxuICAgIC8vIHJlbW92ZSBzcGFjZXMgZnJvbSBudW1iZXJzXG4gICAgY29uc3QgcmVtb3ZlU3BhY2VOdW1iZXJzID0gZnVuY3Rpb24gKG51bSkge1xuICAgICAgbGV0IG5ld051bSA9IG51bSArICcnO1xuXG4gICAgICByZXR1cm4gbmV3TnVtLnJlcGxhY2UoL1xccy9nLCAnJyk7XG4gICAgfTtcblxuICAgIC8vIGNhbGN1bGF0ZSB0b3RhbCBwcmljZVxuICAgIGNvbnN0IGNhbGN1bGF0ZVRvdGFsUHJpY2UgPSBmdW5jdGlvbiAoZWxlbSkge1xuICAgICAgbGV0IGogPSAwO1xuXG4gICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gZWxlbS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBqID0gaiArIHBhcnNlSW50KHJlbW92ZVNwYWNlTnVtYmVycyhlbGVtW2ldLnRleHRDb250ZW50KSwgMTApO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIGo7XG4gICAgfTtcblxuICAgICQoJy5teS1iYXNrZXRfX3RvdGFsLW9yZGVyIC5kYXRlLXBpY2sgaW5wdXQnKS5kYXRlcGlja2VyKHtcbiAgICAgIGxhbmd1YWdlOiAncnUtUlUnLFxuICAgICAgYXV0b1BpY2s6IGZhbHNlLFxuICAgICAgZm9ybWF0OiAnZGQvbW0veXl5eScsXG4gICAgICBhdXRvSGlkZTogdHJ1ZVxuICAgIH0pO1xuXG4gICAgaGVhZEJhc2tldC50ZXh0Q29udGVudCA9IDA7XG5cbiAgICAvLyBjYWxjdWxhdGUgd2VpZ2h0XG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGNhcnRzV2VpZ2h0Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBsZXQgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcbiAgICAgIGNvbnN0IGNhcnRzV2VpZ2h0SXRlbXMgPSBjYXJ0c1dlaWdodFtpXS5xdWVyeVNlbGVjdG9yQWxsKCdsaScpO1xuXG4gICAgICBmb3IgKGxldCBqID0gMCwgamxlbiA9IGNhcnRzV2VpZ2h0SXRlbXMubGVuZ3RoOyBqIDwgamxlbjsgaisrKSB7XG4gICAgICAgIGlmIChjYXJ0c1dlaWdodEl0ZW1zW2pdLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcbiAgICAgICAgICBjYXJ0c1dlaWdodFtpXS5kYXRhc2V0LmN1cnJlbnRQcmljZSA9IGNhcnRzV2VpZ2h0SXRlbXNbal0uZGF0YXNldC5wcmljZTtcbiAgICAgICAgICBjYXJ0c1BlcnNvbnNbaV0udGV4dENvbnRlbnQgPSAn0J3QsCAnICsgY2FydHNXZWlnaHRJdGVtc1tqXS5kYXRhc2V0LnBlcnNvbnMgKyAnINC/0LXRgNGB0L7QvSc7XG4gICAgICAgIH07XG4gICAgICB9O1xuXG4gICAgICBjYXJ0c1ByaWNlW2ldLmluc2VydEJlZm9yZSh0ZXh0LCBjYXJ0c1ByaWNlW2ldLmNoaWxkcmVuWzBdKTtcbiAgICAgIGNhcnRzUHJpY2VbaV0uY2hpbGROb2Rlc1swXS50ZXh0Q29udGVudCA9IGFkZFNwYWNlTnVtYmVycyhjYXJ0c1dlaWdodFtpXS5kYXRhc2V0LmN1cnJlbnRQcmljZSk7XG5cbiAgICAgIGNhcnRzV2VpZ2h0W2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICBjb25zdCBwYXIgPSB0aGlzLmNsb3Nlc3QoJy5nb29kJyk7XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gZXZ0LnRhcmdldC5jbG9zZXN0KCdsaScpO1xuICAgICAgICBjb25zdCBwcmljZSA9IHBhci5xdWVyeVNlbGVjdG9yKCcuZ29vZF9fY29udGVudCAuYm90dG9tIC5wcmljZScpLmNoaWxkTm9kZXNbMF07XG4gICAgICAgIGNvbnN0IHBlcnNvbnMgPSBwYXIucXVlcnlTZWxlY3RvcignLmdvb2RfX2NvbnRlbnQgLndlaWdodCAucHJlc29ucycpO1xuICAgICAgICBjb25zdCBhZGQgPSBwYXIucXVlcnlTZWxlY3RvcignLmdvb2RfX2NvbnRlbnQgLmJvdHRvbSAuYWRkJyk7XG5cbiAgICAgICAgaWYgKGl0ZW1zKSB7XG4gICAgICAgICAgaWYgKCEoaXRlbXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwLCBqbGVuID0gY2FydHNXZWlnaHRJdGVtcy5sZW5ndGg7IGogPCBqbGVuOyBqKyspIHtcbiAgICAgICAgICAgICAgY2FydHNXZWlnaHRJdGVtc1tqXS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgYWRkLmNsYXNzTGlzdC5hZGQoJ2Nsb3NlJyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaXRlbXMuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICBwcmljZS50ZXh0Q29udGVudCA9IGl0ZW1zLmRhdGFzZXQucHJpY2U7XG4gICAgICAgICAgICBwZXJzb25zLnRleHRDb250ZW50ID0gJ9Cd0LAgJyArIGl0ZW1zLmRhdGFzZXQucGVyc29ucyArICcg0L/QtdGA0YHQvtC9JztcbiAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIGNhbGN1bGF0ZSwgYWRkIGNhcnRzXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGNhcnRzQ2FsY3VsYXRlLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBjYXJ0c0NhbGN1bGF0ZVtpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgY29uc3QgcGFyID0gdGhpcy5jbG9zZXN0KCcuZ29vZCAuZ29vZF9fY29udGVudCcpO1xuICAgICAgICBjb25zdCBidG4gPSBldnQudGFyZ2V0LmNsb3Nlc3QoJy5hZGQtYnV0dG9uJyk7XG4gICAgICAgIGNvbnN0IG1pbnVzID0gZXZ0LnRhcmdldC5jbG9zZXN0KCcuY2FsY3VsYXRlIGJ1dHRvbi5taW51cycpO1xuICAgICAgICBjb25zdCB2YWwgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJy5jYWxjdWxhdGUgcCcpO1xuICAgICAgICBjb25zdCBwbHVzID0gZXZ0LnRhcmdldC5jbG9zZXN0KCcuY2FsY3VsYXRlIGJ1dHRvbi5wbHVzJyk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRQcmljZSA9IHBhci5xdWVyeVNlbGVjdG9yKCcud2VpZ2h0IHVsJykuZGF0YXNldC5jdXJyZW50UHJpY2U7XG4gICAgICAgIGNvbnN0IHByaWNlID0gcGFyLnF1ZXJ5U2VsZWN0b3IoJy5ib3R0b20gLnByaWNlJykuY2hpbGROb2Rlc1swXTtcbiAgICAgICAgY29uc3QgY2FydFRpdGxlID0gcGFyLnF1ZXJ5U2VsZWN0b3IoJ2EnKTtcblxuICAgICAgICBpZiAoYnRuKSB7XG4gICAgICAgICAgbGV0IG5ld0dvb2QgPSB0bXBHb29kLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgICBsZXQgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcbiAgICAgICAgICBjb25zdCBuZXdHb29kQ2FsYyA9IG5ld0dvb2QucXVlcnlTZWxlY3RvckFsbCgnLm15LWJhc2tldF9fY2FsYycpO1xuXG4gICAgICAgICAgbmV3R29vZC5xdWVyeVNlbGVjdG9yKCcubXktYmFza2V0X19wcmljZScpLmluc2VydEJlZm9yZSh0ZXh0LCBuZXdHb29kLnF1ZXJ5U2VsZWN0b3IoJy5teS1iYXNrZXRfX3ByaWNlJykuY2hpbGRyZW5bMF0pO1xuXG4gICAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdjbG9zZScpO1xuICAgICAgICAgIGhlYWRCYXNrZXQudGV4dENvbnRlbnQgPSBwYXJzZUludChoZWFkQmFza2V0LnRleHRDb250ZW50LCAxMCkgKyAxO1xuXG4gICAgICAgICAgbXlCYXNrZXRFbXB0eS5jbGFzc0xpc3QuYWRkKCdjbG9zZScpO1xuICAgICAgICAgIG15QmFza2V0T3JkZXIuY2xhc3NMaXN0LnJlbW92ZSgnY2xvc2UnKTtcbiAgICAgICAgICBuZXdHb29kLnF1ZXJ5U2VsZWN0b3IoJy5teS1iYXNrZXRfX2NhcnQtdGl0bGUnKS50ZXh0Q29udGVudCA9IGNhcnRUaXRsZS50ZXh0Q29udGVudDtcbiAgICAgICAgICBuZXdHb29kLnF1ZXJ5U2VsZWN0b3IoJy5teS1iYXNrZXRfX3ByaWNlJykuY2hpbGROb2Rlc1swXS50ZXh0Q29udGVudCA9IHByaWNlLnRleHRDb250ZW50O1xuICAgICAgICAgIG5ld0dvb2QuZGF0YXNldC5jdXJyZW50UHJpY2UgPSBuZXdHb29kLnF1ZXJ5U2VsZWN0b3IoJy5teS1iYXNrZXRfX3ByaWNlJykuY2hpbGROb2Rlc1swXS50ZXh0Q29udGVudDtcbiAgICAgICAgICBteUJhc2tldE9yZGVyQ291bnQudGV4dENvbnRlbnQgPSBoZWFkQmFza2V0LnRleHRDb250ZW50O1xuXG4gICAgICAgICAgbXlCYXNrZXRPcmRlckNvbnRlbnQuYXBwZW5kQ2hpbGQobmV3R29vZCk7XG5cbiAgICAgICAgICBjb25zdCBteUJhc2tldEdvb2RzUHJpY2UgPSBteUJhc2tldE9yZGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5teS1iYXNrZXRfX3ByaWNlJyk7XG5cbiAgICAgICAgICBteUJhc2tldE9yZGVyUHJpY2UudGV4dENvbnRlbnQgPSBhZGRTcGFjZU51bWJlcnMoY2FsY3VsYXRlVG90YWxQcmljZShteUJhc2tldEdvb2RzUHJpY2UpKTsgXG5cbiAgICAgICAgICBmb3IgKGxldCBqID0gMCwgamxlbiA9IG5ld0dvb2RDYWxjLmxlbmd0aDsgaiA8IGpsZW47IGorKykge1xuICAgICAgICAgICAgbmV3R29vZENhbGNbal0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICBjb25zdCBjYWxjR1BhciA9IHRoaXMuY2xvc2VzdCgnLm15LWJhc2tldF9fY29udGVudC1jb250Jyk7XG4gICAgICAgICAgICAgIGNvbnN0IGNhbGNQYXIgPSB0aGlzLmNsb3Nlc3QoJy5teS1iYXNrZXRfX2NhcnQtcm93Jyk7XG4gICAgICAgICAgICAgIGNvbnN0IGNhbGNNaW51cyA9IGUudGFyZ2V0LmNsb3Nlc3QoJ2J1dHRvbi5taW51cycpO1xuICAgICAgICAgICAgICBjb25zdCBjYWxjVmFsID0gdGhpcy5xdWVyeVNlbGVjdG9yKCdwJyk7XG4gICAgICAgICAgICAgIGNvbnN0IGNhbGNQbHVzID0gZS50YXJnZXQuY2xvc2VzdCgnYnV0dG9uLnBsdXMnKTtcbiAgICAgICAgICAgICAgY29uc3QgY2FsY1ByaWNlID0gY2FsY1Bhci5xdWVyeVNlbGVjdG9yKCcubXktYmFza2V0X19wcmljZScpLmNoaWxkTm9kZXNbMF07XG4gICAgICAgICAgICAgIGNvbnN0IGNhY2xUb3RhbFByaWNlID0gY2FsY0dQYXIucXVlcnlTZWxlY3RvcignLm15LWJhc2tldF9fdG90YWwtdGl0bGUgcCcpLmNoaWxkTm9kZXNbMF07XG4gICAgICAgICAgICAgIGNvbnN0IGNhbGNJdGVtc1ByaWNlID0gY2FsY0dQYXIucXVlcnlTZWxlY3RvckFsbCgnLm15LWJhc2tldF9fcHJpY2UnKTtcblxuICAgICAgICAgICAgICBpZiAoY2FsY01pbnVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KGNhbGNWYWwudGV4dENvbnRlbnQsIDEwKSA+IDEpIHtcbiAgICAgICAgICAgICAgICAgIGNhbGNWYWwudGV4dENvbnRlbnQgPSBwYXJzZUludChjYWxjVmFsLnRleHRDb250ZW50LCAxMCkgLSAxO1xuICAgICAgICAgICAgICAgICAgY2FsY1ByaWNlLnRleHRDb250ZW50ID0gYWRkU3BhY2VOdW1iZXJzKHBhcnNlSW50KHJlbW92ZVNwYWNlTnVtYmVycyhjYWxjUHJpY2UudGV4dENvbnRlbnQpLCAxMCkgLSBwYXJzZUludChyZW1vdmVTcGFjZU51bWJlcnMobmV3R29vZC5kYXRhc2V0LmN1cnJlbnRQcmljZSksIDEwKSk7XG4gICAgICAgICAgICAgICAgICBteUJhc2tldE9yZGVyUHJpY2UudGV4dENvbnRlbnQgPSBhZGRTcGFjZU51bWJlcnMoY2FsY3VsYXRlVG90YWxQcmljZShjYWxjSXRlbXNQcmljZSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICBpZiAoY2FsY1BsdXMpIHtcbiAgICAgICAgICAgICAgICBjYWxjVmFsLnRleHRDb250ZW50ID0gcGFyc2VJbnQoY2FsY1ZhbC50ZXh0Q29udGVudCwgMTApICsgMTtcbiAgICAgICAgICAgICAgICBjYWxjUHJpY2UudGV4dENvbnRlbnQgPSBhZGRTcGFjZU51bWJlcnMocGFyc2VJbnQocmVtb3ZlU3BhY2VOdW1iZXJzKGNhbGNQcmljZS50ZXh0Q29udGVudCksIDEwKSArIHBhcnNlSW50KHJlbW92ZVNwYWNlTnVtYmVycyhuZXdHb29kLmRhdGFzZXQuY3VycmVudFByaWNlKSwgMTApKTtcbiAgICAgICAgICAgICAgICBteUJhc2tldE9yZGVyUHJpY2UudGV4dENvbnRlbnQgPSBhZGRTcGFjZU51bWJlcnMoY2FsY3VsYXRlVG90YWxQcmljZShjYWxjSXRlbXNQcmljZSkpO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIG5ld0dvb2QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgY29uc3QgZ2xvYlBhciA9IHRoaXMuY2xvc2VzdCgnLm15LWJhc2tldF9fY29udGVudC1jb250Jyk7XG4gICAgICAgICAgICBjb25zdCBleGl0ID0gZS50YXJnZXQuY2xvc2VzdCgnLmV4aXQnKTtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1QcmljZSA9IHRoaXMucXVlcnlTZWxlY3RvcignLm15LWJhc2tldF9fcHJpY2UnKS5jaGlsZE5vZGVzWzBdO1xuICAgICAgICAgICAgY29uc3QgZ2xvYkl0ZW1zID0gZ2xvYlBhci5xdWVyeVNlbGVjdG9yQWxsKCcubXktYmFza2V0X19jYXJ0Jyk7XG4gICAgICAgICAgICBjb25zdCBnbG9iSXRlbXNQcmljZSA9IGdsb2JQYXIucXVlcnlTZWxlY3RvckFsbCgnLm15LWJhc2tldF9fcHJpY2UnKTtcblxuICAgICAgICAgICAgaWYgKGV4aXQpIHtcbiAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgaXRlbVByaWNlLnRleHRDb250ZW50ID0gMDtcbiAgICAgICAgICAgICAgbXlCYXNrZXRPcmRlclByaWNlLnRleHRDb250ZW50ID0gY2FsY3VsYXRlVG90YWxQcmljZShnbG9iSXRlbXNQcmljZSk7XG5cbiAgICAgICAgICAgICAgaGVhZEJhc2tldC50ZXh0Q29udGVudCA9IHBhcnNlSW50KGhlYWRCYXNrZXQudGV4dENvbnRlbnQsIDEwKSAtIDE7XG4gICAgICAgICAgICAgIG15QmFza2V0T3JkZXJDb3VudC50ZXh0Q29udGVudCA9IGhlYWRCYXNrZXQudGV4dENvbnRlbnQ7XG5cbiAgICAgICAgICAgICAgaWYgKGdsb2JJdGVtcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICBteUJhc2tldEVtcHR5LmNsYXNzTGlzdC5yZW1vdmUoJ2Nsb3NlJyk7XG4gICAgICAgICAgICAgICAgbXlCYXNrZXRPcmRlci5jbGFzc0xpc3QuYWRkKCdjbG9zZScpO1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDAsIGpsZW4gPSBjYXJ0c0NhbGN1bGF0ZS5sZW5ndGg7IGogPCBqbGVuOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgIGNhcnRzQ2FsY3VsYXRlW2pdLmNsYXNzTGlzdC5hZGQoJ2Nsb3NlJyk7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGhlYWRCYXNrZXQudGV4dENvbnRlbnQgPSAwO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChtaW51cykge1xuICAgICAgICAgIGlmIChwYXJzZUludCh2YWwudGV4dENvbnRlbnQsIDEwKSA+IDEpIHtcbiAgICAgICAgICAgIHZhbC50ZXh0Q29udGVudCA9IHBhcnNlSW50KHZhbC50ZXh0Q29udGVudCwgMTApIC0gMTtcbiAgICAgICAgICAgIHByaWNlLnRleHRDb250ZW50ID0gYWRkU3BhY2VOdW1iZXJzKHBhcnNlSW50KHJlbW92ZVNwYWNlTnVtYmVycyhwcmljZS50ZXh0Q29udGVudCksIDEwKSAtIHBhcnNlSW50KHJlbW92ZVNwYWNlTnVtYmVycyhjdXJyZW50UHJpY2UpLCAxMCkpO1xuICAgICAgICAgICAgaGVhZEJhc2tldC50ZXh0Q29udGVudCA9IHBhcnNlSW50KGhlYWRCYXNrZXQudGV4dENvbnRlbnQsIDEwKSAtIDE7XG4gICAgICAgICAgICBteUJhc2tldE9yZGVyQ291bnQudGV4dENvbnRlbnQgPSBoZWFkQmFza2V0LnRleHRDb250ZW50O1xuICAgICAgICAgIH07XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHBsdXMpIHtcbiAgICAgICAgICB2YWwudGV4dENvbnRlbnQgPSBwYXJzZUludCh2YWwudGV4dENvbnRlbnQsIDEwKSArIDE7XG4gICAgICAgICAgcHJpY2UudGV4dENvbnRlbnQgPSBhZGRTcGFjZU51bWJlcnMocGFyc2VJbnQocmVtb3ZlU3BhY2VOdW1iZXJzKHByaWNlLnRleHRDb250ZW50KSwgMTApICsgcGFyc2VJbnQocmVtb3ZlU3BhY2VOdW1iZXJzKGN1cnJlbnRQcmljZSksIDEwKSk7XG4gICAgICAgICAgaGVhZEJhc2tldC50ZXh0Q29udGVudCA9IHBhcnNlSW50KGhlYWRCYXNrZXQudGV4dENvbnRlbnQsIDEwKSArIDE7XG4gICAgICAgICAgbXlCYXNrZXRPcmRlckNvdW50LnRleHRDb250ZW50ID0gaGVhZEJhc2tldC50ZXh0Q29udGVudDtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH07XG59KSgpO1xuXG4vLyBpbm5lci1jYXJ0XG4oZnVuY3Rpb24gKCkge1xuICBjb25zdCBpbm5lckNhcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5uZXItY2FydCcpO1xuICBjb25zdCBteUJhc2tldE9yZGVyQ291bnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubXktYmFza2V0X19jb250ZW50LWNvbnQgLmNvdW50Jyk7XG4gIFxuICAvLyBhZGQgc3BhY2VzIGZyb20gbnVtYmVyc1xuICBjb25zdCBhZGRTcGFjZU51bWJlcnMgPSBmdW5jdGlvbiAobnVtKSB7XG4gICAgbGV0IG5ld051bSA9IG51bSArICcnO1xuXG4gICAgcmV0dXJuIG5ld051bS5yZXBsYWNlKC8oXFxkKSg/PShcXGRcXGRcXGQpKyhbXlxcZF18JCkpL2csICckMSAnKTtcbiAgfTtcblxuICAvLyByZW1vdmUgc3BhY2VzIGZyb20gbnVtYmVyc1xuICBjb25zdCByZW1vdmVTcGFjZU51bWJlcnMgPSBmdW5jdGlvbiAobnVtKSB7XG4gICAgbGV0IG5ld051bSA9IG51bSArICcnO1xuXG4gICAgcmV0dXJuIG5ld051bS5yZXBsYWNlKC9cXHMvZywgJycpO1xuICB9O1xuICBcbiAgLy8gY2FsY3VsYXRlIHRvdGFsIHByaWNlXG4gIGNvbnN0IGNhbGN1bGF0ZVRvdGFsUHJpY2UgPSBmdW5jdGlvbiAoZWxlbSkge1xuICAgIGxldCBqID0gMDtcblxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBlbGVtLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBqID0gaiArIHBhcnNlSW50KHJlbW92ZVNwYWNlTnVtYmVycyhlbGVtW2ldLnRleHRDb250ZW50KSwgMTApO1xuICAgIH07XG5cbiAgICByZXR1cm4gajtcbiAgfTtcbiAgXG4gIGlmIChpbm5lckNhcnQgIT09IG51bGwpIHtcbiAgICBsZXQgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcbiAgICBjb25zdCB3ZWlnaHQgPSBpbm5lckNhcnQucXVlcnlTZWxlY3RvcignLnJvdyAuZGVzYyAub3B0aW9ucyAuYmxvY2stbGVmdCB1bCcpO1xuICAgIGNvbnN0IHdlaWdodEl0ZW1zID0gd2VpZ2h0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJyk7XG4gICAgY29uc3QgcHJpY2UgPSBpbm5lckNhcnQucXVlcnlTZWxlY3RvcignLnJvdyAuZGVzYyAub3B0aW9ucyAuYmxvY2stcmlnaHQgLnByaWNlJyk7XG4gICAgY29uc3QgcGVyc29ucyA9IGlubmVyQ2FydC5xdWVyeVNlbGVjdG9yKCcucm93IC5kZXNjIC5vcHRpb25zIC5ibG9jay1sZWZ0IC5wZXJzb24nKTtcbiAgICBjb25zdCBhZGQgPSBpbm5lckNhcnQucXVlcnlTZWxlY3RvcignLnJvdyAuZGVzYyAub3B0aW9ucyAuYmxvY2stcmlnaHQgLmFkZCcpO1xuICAgIGNvbnN0IGhlYWRCYXNrZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnZS1oZWFkZXIgLnRvcCAuYmt0IGEgcCcpO1xuICAgIGNvbnN0IHRtcEdvb2QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZ29vZEJhc2tldCcpLmNvbnRlbnQucXVlcnlTZWxlY3RvcignLm15LWJhc2tldF9fY2FydCcpO1xuICAgIGNvbnN0IG15QmFza2V0RW1wdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubXktYmFza2V0X19lbXB0eScpO1xuICAgIGNvbnN0IG15QmFza2V0T3JkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubXktYmFza2V0X19jb250ZW50LWNvbnQnKTtcbiAgICBjb25zdCBteUJhc2tldE9yZGVyQ29udGVudCA9IG15QmFza2V0T3JkZXIucXVlcnlTZWxlY3RvcignLm15LWJhc2tldF9fY29udGVudCcpO1xuICAgIGNvbnN0IG15QmFza2V0T3JkZXJQcmljZSA9IG15QmFza2V0T3JkZXIucXVlcnlTZWxlY3RvcignLm15LWJhc2tldF9fdG90YWwtdGl0bGUgcCcpLmNoaWxkTm9kZXNbMF07XG4gICAgXG4gICAgcHJpY2UuaW5zZXJ0QmVmb3JlKHRleHQsIHByaWNlLmNoaWxkcmVuWzBdKTtcbiAgICBcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gd2VpZ2h0SXRlbXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGlmICh3ZWlnaHRJdGVtc1tpXS5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XG4gICAgICAgIHdlaWdodC5kYXRhc2V0LmN1cnJlbnRQcmljZSA9IHdlaWdodEl0ZW1zW2ldLmRhdGFzZXQucHJpY2U7XG4gICAgICAgIHdlaWdodC5kYXRhc2V0LnBlcnNvbnMgPSB3ZWlnaHRJdGVtc1tpXS5kYXRhc2V0LnBlcnNvbnM7XG4gICAgICAgIHByaWNlLmNoaWxkTm9kZXNbMF0udGV4dENvbnRlbnQgPSB3ZWlnaHQuZGF0YXNldC5jdXJyZW50UHJpY2U7XG4gICAgICAgIHBlcnNvbnMudGV4dENvbnRlbnQgPSAn0J3QsCAnICsgd2VpZ2h0LmRhdGFzZXQucGVyc29ucyArICcg0L/QtdGA0YHQvtC9JztcbiAgICAgIH07XG4gICAgfTtcbiAgICBcbiAgICB3ZWlnaHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICBjb25zdCBwYXIgPSB0aGlzLmNsb3Nlc3QoJy5pbm5lci1jYXJ0IC5yb3cgLmRlc2MgLm9wdGlvbnMnKTtcbiAgICAgIGNvbnN0IGl0ZW0gPSBldnQudGFyZ2V0LmNsb3Nlc3QoJ2xpJyk7XG4gICAgICBjb25zdCBjYWxjVmFsID0gcGFyLnF1ZXJ5U2VsZWN0b3IoJy5pbm5lci1jYXJ0IC5yb3cgLmRlc2MgLm9wdGlvbnMgLmJsb2NrLXJpZ2h0IC5hZGQgLmNhbGN1bGF0ZSBwJyk7XG4gICAgICBjb25zdCBjYWxjQWRkID0gcGFyLnF1ZXJ5U2VsZWN0b3IoJy5pbm5lci1jYXJ0IC5yb3cgLmRlc2MgLm9wdGlvbnMgLmJsb2NrLXJpZ2h0IC5hZGQnKTtcbiAgICAgIFxuICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgaWYgKCEoaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSkge1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB3ZWlnaHRJdGVtcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgd2VpZ2h0SXRlbXNbaV0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgIHdlaWdodC5kYXRhc2V0LmN1cnJlbnRQcmljZSA9IGl0ZW0uZGF0YXNldC5wcmljZTtcbiAgICAgICAgICB3ZWlnaHQuZGF0YXNldC5wZXJzb25zID0gaXRlbS5kYXRhc2V0LnBlcnNvbnM7XG4gICAgICAgICAgcHJpY2UuY2hpbGROb2Rlc1swXS50ZXh0Q29udGVudCA9IHdlaWdodC5kYXRhc2V0LmN1cnJlbnRQcmljZTtcbiAgICAgICAgICBwZXJzb25zLnRleHRDb250ZW50ID0gJ9Cd0LAgJyArIHdlaWdodC5kYXRhc2V0LnBlcnNvbnMgKyAnINC/0LXRgNGB0L7QvSc7XG4gICAgICAgICAgY2FsY1ZhbC50ZXh0Q29udGVudCA9IDE7XG4gICAgICAgICAgY2FsY0FkZC5jbGFzc0xpc3QuYWRkKCdjbG9zZScpO1xuICAgICAgICB9O1xuICAgICAgfTtcbiAgICB9KTtcbiAgICBcbiAgICBhZGQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICBjb25zdCBwYXJHID0gdGhpcy5jbG9zZXN0KCcucGFnZS1jb250ZW50X19kZXNjJyk7XG4gICAgICBjb25zdCBwYXIgPSB0aGlzLmNsb3Nlc3QoJy5pbm5lci1jYXJ0IC5yb3cgLmRlc2MgLm9wdGlvbnMnKTtcbiAgICAgIGNvbnN0IGJ0biA9IGV2dC50YXJnZXQuY2xvc2VzdCgnLmFkZC1idXR0b24nKTtcbiAgICAgIGNvbnN0IG1pbnVzID0gZXZ0LnRhcmdldC5jbG9zZXN0KCcuY2FsY3VsYXRlIGJ1dHRvbi5taW51cycpO1xuICAgICAgY29uc3QgdmFsID0gdGhpcy5xdWVyeVNlbGVjdG9yKCcuY2FsY3VsYXRlIHAnKTtcbiAgICAgIGNvbnN0IHBsdXMgPSBldnQudGFyZ2V0LmNsb3Nlc3QoJy5jYWxjdWxhdGUgYnV0dG9uLnBsdXMnKTtcbiAgICAgIGNvbnN0IGN1cnJlbnRQcmljZSA9IHBhci5xdWVyeVNlbGVjdG9yKCcuaW5uZXItY2FydCAucm93IC5kZXNjIC5vcHRpb25zIC5ibG9jay1sZWZ0IHVsJykuZGF0YXNldC5jdXJyZW50UHJpY2U7XG4gICAgICBjb25zdCBwcmljZSA9IHBhci5xdWVyeVNlbGVjdG9yKCcuaW5uZXItY2FydCAucm93IC5kZXNjIC5vcHRpb25zIC5ibG9jay1yaWdodCAucHJpY2UnKS5jaGlsZE5vZGVzWzBdO1xuICAgICAgY29uc3QgdGl0bGUgPSBwYXJHLnF1ZXJ5U2VsZWN0b3IoJy5pbm5lci10aXRlbC1qcycpO1xuICAgICAgXG4gICAgICBpZiAoYnRuKSB7XG4gICAgICAgIGxldCBuZXdHb29kID0gdG1wR29vZC5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgIGNvbnN0IG5ld0dvb2RDYWxjID0gbmV3R29vZC5xdWVyeVNlbGVjdG9yQWxsKCcubXktYmFza2V0X19jYWxjJyk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2Nsb3NlJyk7XG4gICAgICAgIGhlYWRCYXNrZXQudGV4dENvbnRlbnQgPSBwYXJzZUludChoZWFkQmFza2V0LnRleHRDb250ZW50LCAxMCkgKyAxO1xuICAgICAgICBteUJhc2tldEVtcHR5LmNsYXNzTGlzdC5hZGQoJ2Nsb3NlJyk7XG4gICAgICAgIG15QmFza2V0T3JkZXIuY2xhc3NMaXN0LnJlbW92ZSgnY2xvc2UnKTtcbiAgICAgICAgbmV3R29vZC5xdWVyeVNlbGVjdG9yKCcubXktYmFza2V0X19jYXJ0LXRpdGxlJykudGV4dENvbnRlbnQgPSB0aXRsZS50ZXh0Q29udGVudDtcbiAgICAgICAgbmV3R29vZC5xdWVyeVNlbGVjdG9yKCcubXktYmFza2V0X19wcmljZScpLmNoaWxkTm9kZXNbMF0udGV4dENvbnRlbnQgPSBwcmljZS50ZXh0Q29udGVudDtcbiAgICAgICAgbmV3R29vZC5kYXRhc2V0LmN1cnJlbnRQcmljZSA9IG5ld0dvb2QucXVlcnlTZWxlY3RvcignLm15LWJhc2tldF9fcHJpY2UnKS5jaGlsZE5vZGVzWzBdLnRleHRDb250ZW50O1xuICAgICAgICBcbiAgICAgICAgbXlCYXNrZXRPcmRlckNvbnRlbnQuYXBwZW5kQ2hpbGQobmV3R29vZCk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBteUJhc2tldEdvb2RzUHJpY2UgPSBteUJhc2tldE9yZGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5teS1iYXNrZXRfX3ByaWNlJyk7XG4gICAgICAgIFxuICAgICAgICBteUJhc2tldE9yZGVyQ291bnQudGV4dENvbnRlbnQgPSBoZWFkQmFza2V0LnRleHRDb250ZW50O1xuICAgICAgICBteUJhc2tldE9yZGVyUHJpY2UudGV4dENvbnRlbnQgPSBhZGRTcGFjZU51bWJlcnMoY2FsY3VsYXRlVG90YWxQcmljZShteUJhc2tldEdvb2RzUHJpY2UpKTtcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGogPSAwLCBqbGVuID0gbmV3R29vZENhbGMubGVuZ3RoOyBqIDwgamxlbjsgaisrKSB7XG4gICAgICAgICAgbmV3R29vZENhbGNbal0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgY29uc3QgY2FsY0dQYXIgPSB0aGlzLmNsb3Nlc3QoJy5teS1iYXNrZXRfX2NvbnRlbnQtY29udCcpO1xuICAgICAgICAgICAgY29uc3QgY2FsY1BhciA9IHRoaXMuY2xvc2VzdCgnLm15LWJhc2tldF9fY2FydC1yb3cnKTtcbiAgICAgICAgICAgIGNvbnN0IGNhbGNNaW51cyA9IGUudGFyZ2V0LmNsb3Nlc3QoJ2J1dHRvbi5taW51cycpO1xuICAgICAgICAgICAgY29uc3QgY2FsY1ZhbCA9IHRoaXMucXVlcnlTZWxlY3RvcigncCcpO1xuICAgICAgICAgICAgY29uc3QgY2FsY1BsdXMgPSBlLnRhcmdldC5jbG9zZXN0KCdidXR0b24ucGx1cycpO1xuICAgICAgICAgICAgY29uc3QgY2FsY1ByaWNlID0gY2FsY1Bhci5xdWVyeVNlbGVjdG9yKCcubXktYmFza2V0X19wcmljZScpLmNoaWxkTm9kZXNbMF07XG4gICAgICAgICAgICBjb25zdCBjYWNsVG90YWxQcmljZSA9IGNhbGNHUGFyLnF1ZXJ5U2VsZWN0b3IoJy5teS1iYXNrZXRfX3RvdGFsLXRpdGxlIHAnKS5jaGlsZE5vZGVzWzBdO1xuICAgICAgICAgICAgY29uc3QgY2FsY0l0ZW1zUHJpY2UgPSBjYWxjR1Bhci5xdWVyeVNlbGVjdG9yQWxsKCcubXktYmFza2V0X19wcmljZScpO1xuXG4gICAgICAgICAgICBpZiAoY2FsY01pbnVzKSB7XG4gICAgICAgICAgICAgIGlmIChwYXJzZUludChjYWxjVmFsLnRleHRDb250ZW50LCAxMCkgPiAxKSB7XG4gICAgICAgICAgICAgICAgY2FsY1ZhbC50ZXh0Q29udGVudCA9IHBhcnNlSW50KGNhbGNWYWwudGV4dENvbnRlbnQsIDEwKSAtIDE7XG4gICAgICAgICAgICAgICAgY2FsY1ByaWNlLnRleHRDb250ZW50ID0gYWRkU3BhY2VOdW1iZXJzKHBhcnNlSW50KHJlbW92ZVNwYWNlTnVtYmVycyhjYWxjUHJpY2UudGV4dENvbnRlbnQpLCAxMCkgLSBwYXJzZUludChyZW1vdmVTcGFjZU51bWJlcnMobmV3R29vZC5kYXRhc2V0LmN1cnJlbnRQcmljZSksIDEwKSk7XG4gICAgICAgICAgICAgICAgbXlCYXNrZXRPcmRlclByaWNlLnRleHRDb250ZW50ID0gYWRkU3BhY2VOdW1iZXJzKGNhbGN1bGF0ZVRvdGFsUHJpY2UoY2FsY0l0ZW1zUHJpY2UpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKGNhbGNQbHVzKSB7XG4gICAgICAgICAgICAgIGNhbGNWYWwudGV4dENvbnRlbnQgPSBwYXJzZUludChjYWxjVmFsLnRleHRDb250ZW50LCAxMCkgKyAxO1xuICAgICAgICAgICAgICBjYWxjUHJpY2UudGV4dENvbnRlbnQgPSBhZGRTcGFjZU51bWJlcnMocGFyc2VJbnQocmVtb3ZlU3BhY2VOdW1iZXJzKGNhbGNQcmljZS50ZXh0Q29udGVudCksIDEwKSArIHBhcnNlSW50KHJlbW92ZVNwYWNlTnVtYmVycyhuZXdHb29kLmRhdGFzZXQuY3VycmVudFByaWNlKSwgMTApKTtcbiAgICAgICAgICAgICAgbXlCYXNrZXRPcmRlclByaWNlLnRleHRDb250ZW50ID0gYWRkU3BhY2VOdW1iZXJzKGNhbGN1bGF0ZVRvdGFsUHJpY2UoY2FsY0l0ZW1zUHJpY2UpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICBuZXdHb29kLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICBjb25zdCBnbG9iUGFyID0gdGhpcy5jbG9zZXN0KCcubXktYmFza2V0X19jb250ZW50LWNvbnQnKTtcbiAgICAgICAgICBjb25zdCBleGl0ID0gZS50YXJnZXQuY2xvc2VzdCgnLmV4aXQnKTtcbiAgICAgICAgICBjb25zdCBpdGVtUHJpY2UgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJy5teS1iYXNrZXRfX3ByaWNlJykuY2hpbGROb2Rlc1swXTtcbiAgICAgICAgICBjb25zdCBnbG9iSXRlbXMgPSBnbG9iUGFyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5teS1iYXNrZXRfX2NhcnQnKTtcbiAgICAgICAgICBjb25zdCBnbG9iSXRlbXNQcmljZSA9IGdsb2JQYXIucXVlcnlTZWxlY3RvckFsbCgnLm15LWJhc2tldF9fcHJpY2UnKTtcblxuICAgICAgICAgIGlmIChleGl0KSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICAgICAgaXRlbVByaWNlLnRleHRDb250ZW50ID0gMDtcbiAgICAgICAgICAgIG15QmFza2V0T3JkZXJQcmljZS50ZXh0Q29udGVudCA9IGNhbGN1bGF0ZVRvdGFsUHJpY2UoZ2xvYkl0ZW1zUHJpY2UpO1xuXG4gICAgICAgICAgICBoZWFkQmFza2V0LnRleHRDb250ZW50ID0gcGFyc2VJbnQoaGVhZEJhc2tldC50ZXh0Q29udGVudCwgMTApIC0gMTtcbiAgICAgICAgICAgIG15QmFza2V0T3JkZXJDb3VudC50ZXh0Q29udGVudCA9IGhlYWRCYXNrZXQudGV4dENvbnRlbnQ7XG5cbiAgICAgICAgICAgIGlmIChnbG9iSXRlbXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgIG15QmFza2V0RW1wdHkuY2xhc3NMaXN0LnJlbW92ZSgnY2xvc2UnKTtcbiAgICAgICAgICAgICAgbXlCYXNrZXRPcmRlci5jbGFzc0xpc3QuYWRkKCdjbG9zZScpO1xuXG4gICAgICAgICAgICAgIGZvciAobGV0IGogPSAwLCBqbGVuID0gY2FydHNDYWxjdWxhdGUubGVuZ3RoOyBqIDwgamxlbjsgaisrKSB7XG4gICAgICAgICAgICAgICAgY2FydHNDYWxjdWxhdGVbal0uY2xhc3NMaXN0LmFkZCgnY2xvc2UnKTtcbiAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICBoZWFkQmFza2V0LnRleHRDb250ZW50ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgICBcbiAgICAgIGlmIChtaW51cykge1xuICAgICAgICBpZiAocGFyc2VJbnQodmFsLnRleHRDb250ZW50LCAxMCkgPiAxKSB7XG4gICAgICAgICAgdmFsLnRleHRDb250ZW50ID0gcGFyc2VJbnQodmFsLnRleHRDb250ZW50LCAxMCkgLSAxO1xuICAgICAgICAgIHByaWNlLnRleHRDb250ZW50ID0gYWRkU3BhY2VOdW1iZXJzKHBhcnNlSW50KHJlbW92ZVNwYWNlTnVtYmVycyhwcmljZS50ZXh0Q29udGVudCksIDEwKSAtIHBhcnNlSW50KHJlbW92ZVNwYWNlTnVtYmVycyhjdXJyZW50UHJpY2UpLCAxMCkpO1xuICAgICAgICAgIGhlYWRCYXNrZXQudGV4dENvbnRlbnQgPSBwYXJzZUludChoZWFkQmFza2V0LnRleHRDb250ZW50LCAxMCkgLSAxO1xuICAgICAgICAgIG15QmFza2V0T3JkZXJDb3VudC50ZXh0Q29udGVudCA9IGhlYWRCYXNrZXQudGV4dENvbnRlbnQ7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBcbiAgICAgIGlmIChwbHVzKSB7XG4gICAgICAgIHZhbC50ZXh0Q29udGVudCA9IHBhcnNlSW50KHZhbC50ZXh0Q29udGVudCwgMTApICsgMTtcbiAgICAgICAgcHJpY2UudGV4dENvbnRlbnQgPSBhZGRTcGFjZU51bWJlcnMocGFyc2VJbnQocmVtb3ZlU3BhY2VOdW1iZXJzKHByaWNlLnRleHRDb250ZW50KSwgMTApICsgcGFyc2VJbnQocmVtb3ZlU3BhY2VOdW1iZXJzKGN1cnJlbnRQcmljZSksIDEwKSk7XG4gICAgICAgIGhlYWRCYXNrZXQudGV4dENvbnRlbnQgPSBwYXJzZUludChoZWFkQmFza2V0LnRleHRDb250ZW50LCAxMCkgKyAxO1xuICAgICAgICBteUJhc2tldE9yZGVyQ291bnQudGV4dENvbnRlbnQgPSBoZWFkQmFza2V0LnRleHRDb250ZW50O1xuICAgICAgfTtcbiAgICB9KTtcbiAgfTtcbn0pKCk7XG5cbi8vIGJhc2tldFxuKGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgYmFza2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmlubmVyLWJhc2tldCcpO1xuICBcbiAgaWYgKGJhc2tldCAhPT0gbnVsbCkge1xuICAgIGNvbnN0IHByaXZhY3kgPSBiYXNrZXQucXVlcnlTZWxlY3RvcignLmlubmVyLWJhc2tldF9fb3JkZXIgLmJhc2tldC1mb3JtIC5wcml2YWN5IHNwYW4nKTtcbiAgICBjb25zdCBwcml2YWN5SW5wdXQgPSBiYXNrZXQucXVlcnlTZWxlY3RvcignLmlubmVyLWJhc2tldF9fb3JkZXIgLmJhc2tldC1mb3JtIC5wcml2YWN5IGlucHV0Jyk7XG4gICAgY29uc3QgYmFza2V0SXRlbXMgPSBiYXNrZXQucXVlcnlTZWxlY3RvckFsbCgnLmlubmVyLWJhc2tldF9fdGFibGUgLml0ZW1zIGxpJyk7XG4gICAgY29uc3QgYmFza2V0SXRlbXNUb3RhbCA9IGJhc2tldC5xdWVyeVNlbGVjdG9yQWxsKCcuaW5uZXItYmFza2V0X190YWJsZSAuaXRlbXMgbGkgLnRvdGFsIHAnKTtcbiAgICBjb25zdCBiYXNrZXRJdGVtc0N1cnJlbnRQcmljZSA9IGJhc2tldC5xdWVyeVNlbGVjdG9yQWxsKCcuaW5uZXItYmFza2V0X190YWJsZSAuaXRlbXMgbGkgLnByaWNlJyk7XG4gICAgY29uc3QgYmFza2V0VG90YWxQcmljZSA9IGJhc2tldC5xdWVyeVNlbGVjdG9yKCcuaW5uZXItYmFza2V0X190YWJsZSAuc3VtIHAnKTtcbiAgICBjb25zdCBiYXNrZXRDYWxjID0gYmFza2V0LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbm5lci1iYXNrZXRfX3RhYmxlIC5pdGVtcyBsaSAuY2FsY3VsYXRlLXdyYXAgLmNhbGN1bGF0ZScpO1xuICAgIFxuICAgIC8vIGFkZCBzcGFjZXMgZnJvbSBudW1iZXJzXG4gICAgY29uc3QgYWRkU3BhY2VOdW1iZXJzID0gZnVuY3Rpb24gKG51bSkge1xuICAgICAgbGV0IG5ld051bSA9IG51bSArICcnO1xuXG4gICAgICByZXR1cm4gbmV3TnVtLnJlcGxhY2UoLyhcXGQpKD89KFxcZFxcZFxcZCkrKFteXFxkXXwkKSkvZywgJyQxICcpO1xuICAgIH07XG4gICAgXG4gICAgLy8gcmVtb3ZlIHNwYWNlcyBmcm9tIG51bWJlcnNcbiAgICBjb25zdCByZW1vdmVTcGFjZU51bWJlcnMgPSBmdW5jdGlvbiAobnVtKSB7XG4gICAgICBsZXQgbmV3TnVtID0gbnVtICsgJyc7XG5cbiAgICAgIHJldHVybiBuZXdOdW0ucmVwbGFjZSgvXFxzL2csICcnKTtcbiAgICB9O1xuICAgIFxuICAgIC8vIGNhbGN1bGF0ZSB0b3RhbCBwcmljZVxuICAgIGNvbnN0IGNhbGN1bGF0ZVRvdGFsUHJpY2UgPSBmdW5jdGlvbiAoZWxlbSkge1xuICAgICAgbGV0IGogPSAwO1xuICAgICAgXG4gICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gZWxlbS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBqID0gaiArIHBhcnNlSW50KHJlbW92ZVNwYWNlTnVtYmVycyhlbGVtW2ldLnRleHRDb250ZW50KSwgMTApO1xuICAgICAgfTtcbiAgICAgIFxuICAgICAgcmV0dXJuIGo7XG4gICAgfTtcbiAgICBcbiAgICBwcml2YWN5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHByaXZhY3lJbnB1dC5oYXNBdHRyaWJ1dGUoJ2NoZWNrZWQnKSkge1xuICAgICAgICBwcml2YWN5SW5wdXQucmVtb3ZlQXR0cmlidXRlKCdjaGVja2VkJywgJycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHJpdmFjeUlucHV0LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsICcnKTtcbiAgICAgIH07XG4gICAgfSk7XG4gICAgXG4gICAgJCgnLmlubmVyLWJhc2tldF9fb3JkZXIgLmJhc2tldC1mb3JtIC5yb3cgLmJsb2NrLWlucHV0IHVsOm50aC1jaGlsZCgyKSBsaTpudGgtY2hpbGQoMSkgaW5wdXQnKS5kYXRlcGlja2VyKHtcbiAgICAgIGxhbmd1YWdlOiAncnUtUlUnLFxuICAgICAgYXV0b1BpY2s6IGZhbHNlLFxuICAgICAgZm9ybWF0OiAnZGQvbW0veXl5eScsXG4gICAgICBhdXRvSGlkZTogdHJ1ZVxuICAgIH0pO1xuICAgIFxuICAgICQoJy5pbm5lci1iYXNrZXRfX29yZGVyIC5iYXNrZXQtZm9ybSAucm93IC5ibG9jay1pbnB1dCB1bDpudGgtY2hpbGQoMikgbGk6bnRoLWNoaWxkKDIpIGlucHV0JykudGltZXBpY2tlcih7XG4gICAgICB0aW1lRm9ybWF0OiAnSEg6bW0nLFxuICAgICAgaW50ZXJ2YWw6IDMwLFxuICAgICAgZGVmYXVsdFRpbWU6ICcnLFxuICAgIH0pO1xuICAgIFxuICAgIC8vIGFkZCBwcmljZXNcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gYmFza2V0SXRlbXNUb3RhbC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgbGV0IHRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyk7XG4gICAgICBcbiAgICAgIGJhc2tldEl0ZW1zVG90YWxbaV0uaW5zZXJ0QmVmb3JlKHRleHQsIGJhc2tldEl0ZW1zVG90YWxbaV0uY2hpbGRyZW5bMF0pO1xuICAgICAgYmFza2V0SXRlbXNUb3RhbFtpXS5jaGlsZE5vZGVzWzBdLnRleHRDb250ZW50ID0gYmFza2V0SXRlbXNDdXJyZW50UHJpY2VbaV0uY2hpbGROb2Rlc1swXS50ZXh0Q29udGVudDtcbiAgICB9O1xuICAgIFxuICAgIC8vIGFkZCB0b3RhbCBwcmljZVxuICAgIGxldCB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xuICAgIFxuICAgIGJhc2tldFRvdGFsUHJpY2UuaW5zZXJ0QmVmb3JlKHRleHQsIGJhc2tldFRvdGFsUHJpY2UuY2hpbGRyZW5bMF0pO1xuICAgIGJhc2tldFRvdGFsUHJpY2UuY2hpbGROb2Rlc1swXS50ZXh0Q29udGVudCA9IGFkZFNwYWNlTnVtYmVycyhjYWxjdWxhdGVUb3RhbFByaWNlKGJhc2tldEl0ZW1zVG90YWwpKTtcbiAgICBcbiAgICAvLyBjYWxjdWxhdGVcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gYmFza2V0Q2FsYy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgYmFza2V0Q2FsY1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgY29uc3QgcGFyID0gdGhpcy5jbG9zZXN0KCcuaW5uZXItYmFza2V0X190YWJsZSAuaXRlbXMgbGknKTtcbiAgICAgICAgY29uc3QgbWludXMgPSBldnQudGFyZ2V0LmNsb3Nlc3QoJy5pbm5lci1iYXNrZXRfX3RhYmxlIC5pdGVtcyBsaSAuY2FsY3VsYXRlLXdyYXAgLmNhbGN1bGF0ZSBidXR0b24ubWludXMnKTtcbiAgICAgICAgY29uc3QgdmFsID0gdGhpcy5xdWVyeVNlbGVjdG9yKCcuaW5uZXItYmFza2V0X190YWJsZSAuaXRlbXMgbGkgLmNhbGN1bGF0ZS13cmFwIC5jYWxjdWxhdGUgcCcpO1xuICAgICAgICBjb25zdCBwbHVzID0gZXZ0LnRhcmdldC5jbG9zZXN0KCcuaW5uZXItYmFza2V0X190YWJsZSAuaXRlbXMgbGkgLmNhbGN1bGF0ZS13cmFwIC5jYWxjdWxhdGUgYnV0dG9uLnBsdXMnKTtcbiAgICAgICAgY29uc3QgY3VycmVudFByaWNlID0gcGFyLnF1ZXJ5U2VsZWN0b3IoJy5pbm5lci1iYXNrZXRfX3RhYmxlIC5pdGVtcyBsaSAucHJpY2UnKTtcbiAgICAgICAgY29uc3QgdG90YWxQcmljZSA9IHBhci5xdWVyeVNlbGVjdG9yKCcuaW5uZXItYmFza2V0X190YWJsZSAuaXRlbXMgbGkgLnRvdGFsIHAnKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChtaW51cykge1xuICAgICAgICAgIGlmIChwYXJzZUludCh2YWwudGV4dENvbnRlbnQsIDEwKSA+IDEpIHtcbiAgICAgICAgICAgIHZhbC50ZXh0Q29udGVudCA9IHBhcnNlSW50KHZhbC50ZXh0Q29udGVudCwgMTApIC0gMTtcbiAgICAgICAgICAgIHRvdGFsUHJpY2UuY2hpbGROb2Rlc1swXS50ZXh0Q29udGVudCA9IGFkZFNwYWNlTnVtYmVycyhwYXJzZUludChyZW1vdmVTcGFjZU51bWJlcnModG90YWxQcmljZS5jaGlsZE5vZGVzWzBdLnRleHRDb250ZW50KSwgMTApIC0gcGFyc2VJbnQocmVtb3ZlU3BhY2VOdW1iZXJzKGN1cnJlbnRQcmljZS5jaGlsZE5vZGVzWzBdLnRleHRDb250ZW50KSwgMTApKTtcbiAgICAgICAgICAgIGJhc2tldFRvdGFsUHJpY2UuY2hpbGROb2Rlc1swXS50ZXh0Q29udGVudCA9IGFkZFNwYWNlTnVtYmVycyhwYXJzZUludChyZW1vdmVTcGFjZU51bWJlcnMoYmFza2V0VG90YWxQcmljZS5jaGlsZE5vZGVzWzBdLnRleHRDb250ZW50KSwgMTApIC0gcGFyc2VJbnQoY3VycmVudFByaWNlLnRleHRDb250ZW50LCAxMCkpO1xuICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICBpZiAocGx1cykge1xuICAgICAgICAgIHZhbC50ZXh0Q29udGVudCA9IHBhcnNlSW50KHZhbC50ZXh0Q29udGVudCwgMTApICsgMTtcbiAgICAgICAgICB0b3RhbFByaWNlLmNoaWxkTm9kZXNbMF0udGV4dENvbnRlbnQgPSBhZGRTcGFjZU51bWJlcnMocGFyc2VJbnQocmVtb3ZlU3BhY2VOdW1iZXJzKHRvdGFsUHJpY2UuY2hpbGROb2Rlc1swXS50ZXh0Q29udGVudCksIDEwKSArIHBhcnNlSW50KHJlbW92ZVNwYWNlTnVtYmVycyhjdXJyZW50UHJpY2UuY2hpbGROb2Rlc1swXS50ZXh0Q29udGVudCksIDEwKSk7XG4gICAgICAgICAgYmFza2V0VG90YWxQcmljZS5jaGlsZE5vZGVzWzBdLnRleHRDb250ZW50ID0gYWRkU3BhY2VOdW1iZXJzKHBhcnNlSW50KHJlbW92ZVNwYWNlTnVtYmVycyhiYXNrZXRUb3RhbFByaWNlLmNoaWxkTm9kZXNbMF0udGV4dENvbnRlbnQpLCAxMCkgKyBwYXJzZUludChjdXJyZW50UHJpY2UudGV4dENvbnRlbnQsIDEwKSk7XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9O1xuICAgIFxuICAgIC8vIHJlbW92ZVxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBiYXNrZXRJdGVtcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgYmFza2V0SXRlbXNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIGNvbnN0IGV4aXQgPSBldnQudGFyZ2V0LmNsb3Nlc3QoJy5pbm5lci1iYXNrZXRfX3RhYmxlIC5pdGVtcyBsaSAuZXhpdCcpO1xuICAgICAgICBjb25zdCBpdGVtVG90YWxQcmljZSA9IHRoaXMucXVlcnlTZWxlY3RvcignLmlubmVyLWJhc2tldF9fdGFibGUgLml0ZW1zIGxpIC50b3RhbCBwJykuY2hpbGROb2Rlc1swXTtcbiAgICAgICAgXG4gICAgICAgIGlmIChleGl0KSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICAgICAgICBpdGVtVG90YWxQcmljZS50ZXh0Q29udGVudCA9IDA7XG4gICAgICAgICAgYmFza2V0VG90YWxQcmljZS5jaGlsZE5vZGVzWzBdLnRleHRDb250ZW50ID0gYWRkU3BhY2VOdW1iZXJzKGNhbGN1bGF0ZVRvdGFsUHJpY2UoYmFza2V0SXRlbXNUb3RhbCkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuICB9O1xufSkoKTtcblxuLy8gYW5pbWF0aW9uIGFkZFxuKGZ1bmN0aW9uICgpIHtcbiAgLy8g0LPQtNC1XG4gIC8vIC5nb29kX19jb250ZW50IC5ib3R0b20gLmFkZC5jbG9zZSAuYWRkLWJ1dHRvbiAtINC60L3QvtC/0LrQsCDQtNC+0LHQsNCy0LjRgtGMINCyINC60L7RgNC30LjQvdGDXG4gIC8vIC5nb29kIC5pbWcgaW1nIC0g0LrQsNGA0YLQuNC90LrQsCDQutC+0YLQvtGA0LDRjyDQsdGD0LTQtdGCINC40YHQv9C+0LvRjNC30L7QstCw0YLRjNGB0Y8g0L/RgNC4INCw0L3QuNC80LDRhtC40LhcbiAgLy8gLm15LWJhc2tldCAtINC60L7RgNC30LjQvdCwINC60YPQtNCwINCx0YPQtNC10YIg0LvQtdGC0LXRgtGMINC60LDRgNGC0LjQvdC60LBcbiAgXG4gICQoXCIuZ29vZF9fY29udGVudCAuYm90dG9tIC5hZGQuY2xvc2UgLmFkZC1idXR0b25cIikub24oXCJjbGlja1wiLGZ1bmN0aW9uKCl7XG4gICAgJChcIi5nb29kIC5pbWcgaW1nXCIpXG4gICAgICAuY2xvbmUoKVxuICAgICAgLmNzcyh7J3Bvc2l0aW9uJyA6ICdhYnNvbHV0ZScsICd6LWluZGV4JyA6ICcxMTEwMCcsIHdpZHRoOiAnMTAwcHgnLCB0b3A6ICQodGhpcykub2Zmc2V0KCkudG9wLTUwLCBsZWZ0OiQodGhpcykub2Zmc2V0KCkubGVmdCs1MH0pXG4gICAgICAuYXBwZW5kVG8oXCJib2R5XCIpXG4gICAgICAuYW5pbWF0ZSh7b3BhY2l0eTogMC4wNSxcbiAgICAgICAgbGVmdDogJChcIi5teS1iYXNrZXRcIikub2Zmc2V0KClbJ2xlZnQnXSxcbiAgICAgICAgdG9wOiAkKFwiLm15LWJhc2tldFwiKS5vZmZzZXQoKVsndG9wJ10sXG4gICAgICAgIHdpZHRoOiAyMH0sIDEwMDAsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLnJlbW92ZSgpO1xuICAgICAgfSk7XG4gIH0pO1xuICBcbiAgJChcIi5pbm5lci1jYXJ0IC5yb3cgLmRlc2MgLm9wdGlvbnMgLmJsb2NrLXJpZ2h0IC5hZGQuY2xvc2UgLmFkZC1idXR0b25cIikub24oXCJjbGlja1wiLGZ1bmN0aW9uKCl7XG4gICAgJChcIi5pbm5lci1jYXJ0IC5yb3cgLmltZyBpbWdcIilcbiAgICAgIC5jbG9uZSgpXG4gICAgICAuY3NzKHsncG9zaXRpb24nIDogJ2Fic29sdXRlJywgJ3otaW5kZXgnIDogJzExMTAwJywgd2lkdGg6ICcxMDBweCcsIHRvcDogJCh0aGlzKS5vZmZzZXQoKS50b3AtNTAsIGxlZnQ6JCh0aGlzKS5vZmZzZXQoKS5sZWZ0KzUwfSlcbiAgICAgIC5hcHBlbmRUbyhcImJvZHlcIilcbiAgICAgIC5hbmltYXRlKHtvcGFjaXR5OiAwLjA1LFxuICAgICAgICBsZWZ0OiAkKFwiLm15LWJhc2tldFwiKS5vZmZzZXQoKVsnbGVmdCddLFxuICAgICAgICB0b3A6ICQoXCIubXktYmFza2V0XCIpLm9mZnNldCgpWyd0b3AnXSxcbiAgICAgICAgd2lkdGg6IDIwfSwgMTAwMCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcykucmVtb3ZlKCk7XG4gICAgICB9KTtcbiAgfSk7XG59KSgpO1xuXG4vLyBuYXYgc2xpZGVyXG4oZnVuY3Rpb24gKCkge1xuICBjb25zdCBzbGlkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2LXNsaWRlcl9fY29udGVudCcpO1xuICBcbiAgaWYgKHNsaWRlciAhPT0gbnVsbCkge1xuICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG4gICAgICAkKFwiLm5hdi1zbGlkZXJfX2NvbnRlbnRcIikub3dsQ2Fyb3VzZWwoe1xuICAgICAgICBzbGlkZVRyYW5zaXRpb246ICdlYXNlJyxcbiAgICAgICAgc21hcnRTcGVlZDogMjAwLFxuICAgICAgICBhdXRvcGxheTogZmFsc2UsXG4gICAgICAgIG5hdjogdHJ1ZSxcbiAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgIHJlc3BvbnNpdmU6IHtcbiAgICAgICAgICAxNzAwOiB7XG4gICAgICAgICAgICBpdGVtczogMTAsXG4gICAgICAgICAgICBtYXJnaW46IDEwXG4gICAgICAgICAgfSxcbiAgICAgICAgICAxNjIwOiB7XG4gICAgICAgICAgICBpdGVtczogOSxcbiAgICAgICAgICAgIG1hcmdpbjogMTBcbiAgICAgICAgICB9LFxuICAgICAgICAgIDE0MjA6IHtcbiAgICAgICAgICAgIGl0ZW1zOiA4LFxuICAgICAgICAgICAgbWFyZ2luOiAxMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgMTEwMDoge1xuICAgICAgICAgICAgaXRlbXM6IDcsXG4gICAgICAgICAgICBtYXJnaW46IDEwXG4gICAgICAgICAgfSxcbiAgICAgICAgICAxMDAwOiB7XG4gICAgICAgICAgICBpdGVtczogNixcbiAgICAgICAgICAgIG1hcmdpbjogMTBcbiAgICAgICAgICB9LFxuICAgICAgICAgIDc3MDoge1xuICAgICAgICAgICAgaXRlbXM6IDUsXG4gICAgICAgICAgICBtYXJnaW46IDEwXG4gICAgICAgICAgfSxcbiAgICAgICAgICA1NjA6IHtcbiAgICAgICAgICAgIGl0ZW1zOiAzLFxuICAgICAgICAgICAgbWFyZ2luOiAxMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgNDYwOiB7XG4gICAgICAgICAgICBpdGVtczogMixcbiAgICAgICAgICAgIG1hcmdpbjogMTBcbiAgICAgICAgICB9LFxuICAgICAgICAgIDMyMDoge1xuICAgICAgICAgICAgaXRlbXM6IDEsXG4gICAgICAgICAgICBtYXJnaW46IDBcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59KSgpO1xuXG4vLyBzbGlkZXItcmVjb21lbmRcbihmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHNsaWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXItcmVjb21lbmQgLnNsaWRlcicpO1xuICBcbiAgaWYgKHNsaWRlciAhPT0gbnVsbCkge1xuICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG4gICAgICAkKFwiLnNsaWRlci1yZWNvbWVuZCAuc2xpZGVyXCIpLm93bENhcm91c2VsKHtcbiAgICAgICAgc2xpZGVUcmFuc2l0aW9uOiAnZWFzZScsXG4gICAgICAgIHNtYXJ0U3BlZWQ6IDIwMCxcbiAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxuICAgICAgICBuYXY6IHRydWUsXG4gICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICByZXNwb25zaXZlOiB7XG4gICAgICAgICAgMTgyMDoge1xuICAgICAgICAgICAgaXRlbXM6IDIsXG4gICAgICAgICAgICBtYXJnaW46IDE5LFxuICAgICAgICAgICAgc3RhZ2VQYWRkaW5nOiAyMTBcbiAgICAgICAgICB9LFxuICAgICAgICAgIDE3MTA6IHtcbiAgICAgICAgICAgIGl0ZW1zOiAyLFxuICAgICAgICAgICAgbWFyZ2luOiAxOSxcbiAgICAgICAgICAgIHN0YWdlUGFkZGluZzogMTUwXG4gICAgICAgICAgfSxcbiAgICAgICAgICAxNjAwOiB7XG4gICAgICAgICAgICBpdGVtczogMixcbiAgICAgICAgICAgIG1hcmdpbjogMTksXG4gICAgICAgICAgICBzdGFnZVBhZGRpbmc6IDEwMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgMTUyMDoge1xuICAgICAgICAgICAgaXRlbXM6IDIsXG4gICAgICAgICAgICBtYXJnaW46IDE5LFxuICAgICAgICAgICAgc3RhZ2VQYWRkaW5nOiA3MFxuICAgICAgICAgIH0sXG4gICAgICAgICAgMTM4MDoge1xuICAgICAgICAgICAgaXRlbXM6IDEsXG4gICAgICAgICAgICBtYXJnaW46IDE5LFxuICAgICAgICAgICAgc3RhZ2VQYWRkaW5nOiAyMDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIDEwMjA6IHtcbiAgICAgICAgICAgIGl0ZW1zOiAxLFxuICAgICAgICAgICAgbWFyZ2luOiAxOSxcbiAgICAgICAgICAgIHN0YWdlUGFkZGluZzogMjAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICA4NzA6IHtcbiAgICAgICAgICAgIGl0ZW1zOiAxLFxuICAgICAgICAgICAgbWFyZ2luOiAxOSxcbiAgICAgICAgICAgIHN0YWdlUGFkZGluZzogMTAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICA3MzA6IHtcbiAgICAgICAgICAgIGl0ZW1zOiAxLFxuICAgICAgICAgICAgbWFyZ2luOiAxOSxcbiAgICAgICAgICAgIHN0YWdlUGFkZGluZzogNzBcbiAgICAgICAgICB9LFxuICAgICAgICAgIDMyMDoge1xuICAgICAgICAgICAgaXRlbXM6IDEsXG4gICAgICAgICAgICBtYXJnaW46IDAsXG4gICAgICAgICAgICBzdGFnZVBhZGRpbmc6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59KSgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbWFya3VwL3N0YXRpYy9qcy9tYWluLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==