'use strict';

// date and time pickers
(function () {
  const date = document.querySelector('.date-row-top');
  const btn = document.querySelector('.page-header .top .date .date-content button');
  const dateInput = document.querySelector('.page-header .top .date .date-content .date-pick input');
  const timeInput = document.querySelector('.page-header .top .date .date-content .time-pick input');
  
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
    defaultTime: '',
  });
  
  btn.addEventListener('click', function () {
    let dateContent = date.querySelector('p');
    
    dateContent.textContent = dateInput.value + ' в ' + timeInput.value;
    date.classList.add('close');
  });
})();

// good
(function () {
  const myBasket = document.querySelector('.my-basket');
  
  // carts
  const cartsWeight = document.querySelectorAll('.good__content .weight ul');
  const cartsPrice = document.querySelectorAll('.good__content .bottom .price');
  const cartsPersons = document.querySelectorAll('.good__content .weight .presons');
  const headBasket = document.querySelector('.page-header .top .bkt a p');
  const cartsCalculate = document.querySelectorAll('.good .good__content .bottom .add');
  
  // my-basket
  if (myBasket !== null) {
    const myBasketEmpty = myBasket.querySelector('.my-basket__empty');
    const myBasketOrder = myBasket.querySelector('.my-basket__content-cont');
    const myBasketOrderContent = myBasketOrder.querySelector('.my-basket__content');
    const myBasketOrderPrice = myBasketOrder.querySelector('.my-basket__total-title p').childNodes[0];
    const myBasketOrderCount = myBasket.querySelector('.my-basket__content-cont .count');
    
    // templates
    const tmpGood = document.querySelector('#goodBasket').content.querySelector('.my-basket__cart');
  
    // add spaces from numbers
      const addSpaceNumbers = function (num) {
        let newNum = num + '';

        return newNum.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
      };

    // remove spaces from numbers
    const removeSpaceNumbers = function (num) {
      let newNum = num + '';

      return newNum.replace(/\s/g, '');
    };

    // calculate total price
    const calculateTotalPrice = function (elem) {
      let j = 0;

      for (let i = 0, len = elem.length; i < len; i++) {
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
    for (let i = 0, len = cartsWeight.length; i < len; i++) {
      let text = document.createTextNode('');
      const cartsWeightItems = cartsWeight[i].querySelectorAll('li');

      for (let j = 0, jlen = cartsWeightItems.length; j < jlen; j++) {
        if (cartsWeightItems[j].classList.contains('active')) {
          cartsWeight[i].dataset.currentPrice = cartsWeightItems[j].dataset.price;
          cartsPersons[i].textContent = 'На ' + cartsWeightItems[j].dataset.persons + ' персон';
        };
      };

      cartsPrice[i].insertBefore(text, cartsPrice[i].children[0]);
      cartsPrice[i].childNodes[0].textContent = addSpaceNumbers(cartsWeight[i].dataset.currentPrice);

      cartsWeight[i].addEventListener('click', function (evt) {
        const par = this.closest('.good');
        const items = evt.target.closest('li');
        const price = par.querySelector('.good__content .bottom .price').childNodes[0];
        const persons = par.querySelector('.good__content .weight .presons');
        const add = par.querySelector('.good__content .bottom .add');

        if (items) {
          if (!(items.classList.contains('active'))) {
            for (let j = 0, jlen = cartsWeightItems.length; j < jlen; j++) {
              cartsWeightItems[j].classList.remove('active');
              add.classList.add('close');
            };
            items.classList.add('active');
            price.textContent = items.dataset.price;
            persons.textContent = 'На ' + items.dataset.persons + ' персон';
          };
        };
      });
    };

    // calculate, add carts
    for (let i = 0, len = cartsCalculate.length; i < len; i++) {
      cartsCalculate[i].addEventListener('click', function (evt) {
        const par = this.closest('.good .good__content');
        const btn = evt.target.closest('.add-button');
        const minus = evt.target.closest('.calculate button.minus');
        const val = this.querySelector('.calculate p');
        const plus = evt.target.closest('.calculate button.plus');
        const currentPrice = par.querySelector('.weight ul').dataset.currentPrice;
        const price = par.querySelector('.bottom .price').childNodes[0];
        const cartTitle = par.querySelector('a');

        if (btn) {
          let newGood = tmpGood.cloneNode(true);
          let text = document.createTextNode('');
          const newGoodCalc = newGood.querySelectorAll('.my-basket__calc');

          newGood.querySelector('.my-basket__price').insertBefore(text, newGood.querySelector('.my-basket__price').children[0]);

          this.classList.remove('close');
          headBasket.textContent = parseInt(headBasket.textContent, 10) + 1;

          myBasketEmpty.classList.add('close');
          myBasketOrder.classList.remove('close');
          newGood.querySelector('.my-basket__cart-title').textContent = cartTitle.textContent;
          newGood.querySelector('.my-basket__price').childNodes[0].textContent = price.textContent;
          newGood.dataset.currentPrice = newGood.querySelector('.my-basket__price').childNodes[0].textContent;
          myBasketOrderCount.textContent = headBasket.textContent;

          myBasketOrderContent.appendChild(newGood);

          const myBasketGoodsPrice = myBasketOrder.querySelectorAll('.my-basket__price');

          myBasketOrderPrice.textContent = addSpaceNumbers(calculateTotalPrice(myBasketGoodsPrice)); 

          for (let j = 0, jlen = newGoodCalc.length; j < jlen; j++) {
            newGoodCalc[j].addEventListener('click', function (e) {
              const calcGPar = this.closest('.my-basket__content-cont');
              const calcPar = this.closest('.my-basket__cart-row');
              const calcMinus = e.target.closest('button.minus');
              const calcVal = this.querySelector('p');
              const calcPlus = e.target.closest('button.plus');
              const calcPrice = calcPar.querySelector('.my-basket__price').childNodes[0];
              const caclTotalPrice = calcGPar.querySelector('.my-basket__total-title p').childNodes[0];
              const calcItemsPrice = calcGPar.querySelectorAll('.my-basket__price');

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
            const globPar = this.closest('.my-basket__content-cont');
            const exit = e.target.closest('.exit');
            const itemPrice = this.querySelector('.my-basket__price').childNodes[0];
            const globItems = globPar.querySelectorAll('.my-basket__cart');
            const globItemsPrice = globPar.querySelectorAll('.my-basket__price');

            if (exit) {
              this.remove();
              itemPrice.textContent = 0;
              myBasketOrderPrice.textContent = calculateTotalPrice(globItemsPrice);

              headBasket.textContent = parseInt(headBasket.textContent, 10) - 1;
              myBasketOrderCount.textContent = headBasket.textContent;

              if (globItems.length === 1) {
                myBasketEmpty.classList.remove('close');
                myBasketOrder.classList.add('close');

                for (let j = 0, jlen = cartsCalculate.length; j < jlen; j++) {
                  cartsCalculate[j].classList.add('close');
                };

                headBasket.textContent = 0;
              }
            };
          });
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
  };
})();

// inner-cart
(function () {
  const innerCart = document.querySelector('.inner-cart');
  const myBasketOrderCount = document.querySelector('.my-basket__content-cont .count');
  
  // add spaces from numbers
  const addSpaceNumbers = function (num) {
    let newNum = num + '';

    return newNum.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
  };

  // remove spaces from numbers
  const removeSpaceNumbers = function (num) {
    let newNum = num + '';

    return newNum.replace(/\s/g, '');
  };
  
  // calculate total price
  const calculateTotalPrice = function (elem) {
    let j = 0;

    for (let i = 0, len = elem.length; i < len; i++) {
      j = j + parseInt(removeSpaceNumbers(elem[i].textContent), 10);
    };

    return j;
  };
  
  if (innerCart !== null) {
    let text = document.createTextNode('');
    const weight = innerCart.querySelector('.row .desc .options .block-left ul');
    const weightItems = weight.querySelectorAll('li');
    const price = innerCart.querySelector('.row .desc .options .block-right .price');
    const persons = innerCart.querySelector('.row .desc .options .block-left .person');
    const add = innerCart.querySelector('.row .desc .options .block-right .add');
    const headBasket = document.querySelector('.page-header .top .bkt a p');
    const tmpGood = document.querySelector('#goodBasket').content.querySelector('.my-basket__cart');
    const myBasketEmpty = document.querySelector('.my-basket__empty');
    const myBasketOrder = document.querySelector('.my-basket__content-cont');
    const myBasketOrderContent = myBasketOrder.querySelector('.my-basket__content');
    const myBasketOrderPrice = myBasketOrder.querySelector('.my-basket__total-title p').childNodes[0];
    
    price.insertBefore(text, price.children[0]);
    
    for (let i = 0, len = weightItems.length; i < len; i++) {
      if (weightItems[i].classList.contains('active')) {
        weight.dataset.currentPrice = weightItems[i].dataset.price;
        weight.dataset.persons = weightItems[i].dataset.persons;
        price.childNodes[0].textContent = weight.dataset.currentPrice;
        persons.textContent = 'На ' + weight.dataset.persons + ' персон';
      };
    };
    
    weight.addEventListener('click', function (evt) {
      const par = this.closest('.inner-cart .row .desc .options');
      const item = evt.target.closest('li');
      const calcVal = par.querySelector('.inner-cart .row .desc .options .block-right .add .calculate p');
      const calcAdd = par.querySelector('.inner-cart .row .desc .options .block-right .add');
      
      if (item) {
        if (!(item.classList.contains('active'))) {
          for (let i = 0, len = weightItems.length; i < len; i++) {
            weightItems[i].classList.remove('active');
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
      const parG = this.closest('.page-content__desc');
      const par = this.closest('.inner-cart .row .desc .options');
      const btn = evt.target.closest('.add-button');
      const minus = evt.target.closest('.calculate button.minus');
      const val = this.querySelector('.calculate p');
      const plus = evt.target.closest('.calculate button.plus');
      const currentPrice = par.querySelector('.inner-cart .row .desc .options .block-left ul').dataset.currentPrice;
      const price = par.querySelector('.inner-cart .row .desc .options .block-right .price').childNodes[0];
      const title = parG.querySelector('.inner-titel-js');
      
      if (btn) {
        let newGood = tmpGood.cloneNode(true);
        const newGoodCalc = newGood.querySelectorAll('.my-basket__calc');
        
        this.classList.remove('close');
        headBasket.textContent = parseInt(headBasket.textContent, 10) + 1;
        myBasketEmpty.classList.add('close');
        myBasketOrder.classList.remove('close');
        newGood.querySelector('.my-basket__cart-title').textContent = title.textContent;
        newGood.querySelector('.my-basket__price').childNodes[0].textContent = price.textContent;
        newGood.dataset.currentPrice = newGood.querySelector('.my-basket__price').childNodes[0].textContent;
        
        myBasketOrderContent.appendChild(newGood);
        
        const myBasketGoodsPrice = myBasketOrder.querySelectorAll('.my-basket__price');
        
        myBasketOrderCount.textContent = headBasket.textContent;
        myBasketOrderPrice.textContent = addSpaceNumbers(calculateTotalPrice(myBasketGoodsPrice));
        
        for (let j = 0, jlen = newGoodCalc.length; j < jlen; j++) {
          newGoodCalc[j].addEventListener('click', function (e) {
            const calcGPar = this.closest('.my-basket__content-cont');
            const calcPar = this.closest('.my-basket__cart-row');
            const calcMinus = e.target.closest('button.minus');
            const calcVal = this.querySelector('p');
            const calcPlus = e.target.closest('button.plus');
            const calcPrice = calcPar.querySelector('.my-basket__price').childNodes[0];
            const caclTotalPrice = calcGPar.querySelector('.my-basket__total-title p').childNodes[0];
            const calcItemsPrice = calcGPar.querySelectorAll('.my-basket__price');

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
          const globPar = this.closest('.my-basket__content-cont');
          const exit = e.target.closest('.exit');
          const itemPrice = this.querySelector('.my-basket__price').childNodes[0];
          const globItems = globPar.querySelectorAll('.my-basket__cart');
          const globItemsPrice = globPar.querySelectorAll('.my-basket__price');

          if (exit) {
            this.remove();
            itemPrice.textContent = 0;
            myBasketOrderPrice.textContent = calculateTotalPrice(globItemsPrice);

            headBasket.textContent = parseInt(headBasket.textContent, 10) - 1;
            myBasketOrderCount.textContent = headBasket.textContent;

            if (globItems.length === 1) {
              myBasketEmpty.classList.remove('close');
              myBasketOrder.classList.add('close');

              for (let j = 0, jlen = cartsCalculate.length; j < jlen; j++) {
                cartsCalculate[j].classList.add('close');
              };

              headBasket.textContent = 0;
            }
          };
        });
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
  const basket = document.querySelector('.inner-basket');
  
  if (basket !== null) {
    const privacy = basket.querySelector('.inner-basket__order .basket-form .privacy span');
    const privacyInput = basket.querySelector('.inner-basket__order .basket-form .privacy input');
    const basketItems = basket.querySelectorAll('.inner-basket__table .items li');
    const basketItemsTotal = basket.querySelectorAll('.inner-basket__table .items li .total p');
    const basketItemsCurrentPrice = basket.querySelectorAll('.inner-basket__table .items li .price');
    const basketTotalPrice = basket.querySelector('.inner-basket__table .sum p');
    const basketCalc = basket.querySelectorAll('.inner-basket__table .items li .calculate-wrap .calculate');
    
    // add spaces from numbers
    const addSpaceNumbers = function (num) {
      let newNum = num + '';

      return newNum.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    };
    
    // remove spaces from numbers
    const removeSpaceNumbers = function (num) {
      let newNum = num + '';

      return newNum.replace(/\s/g, '');
    };
    
    // calculate total price
    const calculateTotalPrice = function (elem) {
      let j = 0;
      
      for (let i = 0, len = elem.length; i < len; i++) {
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
      defaultTime: '',
    });
    
    // add prices
    for (let i = 0, len = basketItemsTotal.length; i < len; i++) {
      let text = document.createTextNode('');
      
      basketItemsTotal[i].insertBefore(text, basketItemsTotal[i].children[0]);
      basketItemsTotal[i].childNodes[0].textContent = basketItemsCurrentPrice[i].childNodes[0].textContent;
    };
    
    // add total price
    let text = document.createTextNode('');
    
    basketTotalPrice.insertBefore(text, basketTotalPrice.children[0]);
    basketTotalPrice.childNodes[0].textContent = addSpaceNumbers(calculateTotalPrice(basketItemsTotal));
    
    // calculate
    for (let i = 0, len = basketCalc.length; i < len; i++) {
      basketCalc[i].addEventListener('click', function (evt) {
        const par = this.closest('.inner-basket__table .items li');
        const minus = evt.target.closest('.inner-basket__table .items li .calculate-wrap .calculate button.minus');
        const val = this.querySelector('.inner-basket__table .items li .calculate-wrap .calculate p');
        const plus = evt.target.closest('.inner-basket__table .items li .calculate-wrap .calculate button.plus');
        const currentPrice = par.querySelector('.inner-basket__table .items li .price');
        const totalPrice = par.querySelector('.inner-basket__table .items li .total p');
        
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
    for (let i = 0, len = basketItems.length; i < len; i++) {
      basketItems[i].addEventListener('click', function (evt) {
        const exit = evt.target.closest('.inner-basket__table .items li .exit');
        const itemTotalPrice = this.querySelector('.inner-basket__table .items li .total p').childNodes[0];
        
        if (exit) {
          this.remove();
          itemTotalPrice.textContent = 0;
          basketTotalPrice.childNodes[0].textContent = addSpaceNumbers(calculateTotalPrice(basketItemsTotal));
        }
      });
    };
  };
})();

// animation add
(function () {
  // где
  // .good__content .bottom .add.close .add-button - кнопка добавить в корзину
  // .good .img img - картинка которая будет использоваться при анимации
  // .my-basket - корзина куда будет лететь картинка
  
  $(".good__content .bottom .add.close .add-button").on("click",function(){
    $(".good .img img")
      .clone()
      .css({'position' : 'absolute', 'z-index' : '11100', width: '100px', top: $(this).offset().top-50, left:$(this).offset().left+50})
      .appendTo("body")
      .animate({opacity: 0.05,
        left: $(".my-basket").offset()['left'],
        top: $(".my-basket").offset()['top'],
        width: 20}, 1000, function() {
        $(this).remove();
      });
  });
  
  $(".inner-cart .row .desc .options .block-right .add.close .add-button").on("click",function(){
    $(".inner-cart .row .img img")
      .clone()
      .css({'position' : 'absolute', 'z-index' : '11100', width: '100px', top: $(this).offset().top-50, left:$(this).offset().left+50})
      .appendTo("body")
      .animate({opacity: 0.05,
        left: $(".my-basket").offset()['left'],
        top: $(".my-basket").offset()['top'],
        width: 20}, 1000, function() {
        $(this).remove();
      });
  });
})();

// nav slider
(function () {
  const slider = document.querySelector('.nav-slider__content');
  
  if (slider !== null) {
    $(document).ready(function(){
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
  const slider = document.querySelector('.slider-recomend .slider');
  
  if (slider !== null) {
    $(document).ready(function(){
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
