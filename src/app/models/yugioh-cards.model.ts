export interface YugiohCardsModel {
    data:[
        {
            id?: number,
            name?: string,
            type?: string,
            desc?: string,
            race?: string,
            archetype?: string,
            card_sets?: card_sets[]
            card_images?:card_images[]
            card_prices?:card_prices []
        }
    ]
    
}

interface card_sets{
    set_name?: string,
    set_code?: string,
    set_rarity?: string,
    set_rarity_code?: string,
    set_price?: string
}
interface card_images{
    id?: number,
    image_url?: string,
    image_url_small?: string
}
interface card_prices{
    cardmarket_price?: string,
    tcgplayer_price?: string,
    ebay_price?: string,
    amazon_price?: string,
    coolstuffinc_price?: string
}