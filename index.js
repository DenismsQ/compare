const puppeteer = require('puppeteer');

async function comparePrices(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://www.technodom.kz/p/chajnik-kitfort-kt-6120-1-250481')

    const technodomPrice = await page.evaluate(()=>{
        const price = document.querySelector('.--accented').innerText;
        return parseFloat(price.replace(/[^0-9.-]+/g,''));
    });

    await page.goto('https://www.sulpak.kz/g/elektricheskij_chajnik_kitfort_kt_6120_2')

    const sulpacPrice = await page.evaluate(()=>{
        const price = document.querySelector('.product__price').innerText;
        return parseFloat(price.replace(/[^0-9.-]+/g,''));
    });

    await page.goto('https://shop.kz/offer/chaynik-kitfort-kt-6120-2-gray/')
     
    const shopPrice = await page.evaluate(()=>{
        const price = document.querySelector('.item_current_price').innerText;
        return parseFloat(price.replace(/[^0-9.-]+/g,''));
    });

    if(technodomPrice == sulpacPrice && sulpacPrice == shopPrice){
        console.log('Цены одинаковы '+ technodomPrice)
    }else if (technodomPrice > sulpacPrice && technodomPrice > shopPrice){
        console.log('Выгода в технодоме'+technodomPrice)

    }else if(sulpacPrice>technodomPrice && sulpacPrice>shopPrice){
        console.log('Выгода в сулпаке'+sulpacPrice)
    }else if(technodomPrice == sulpacPrice){
        console.log('Выгода в технодома и сулпаке =='+ technodomPrice)
    }else{
        console.log('Выгода в белом ветре' + shopPrice)
    }

    await browser.close();
}
comparePrices();