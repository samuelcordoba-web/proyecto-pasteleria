const productos = [
  {
    nombre: "Dylan Blue",
    categoria: "hombres",
    img: "img/dylan blue.jpeg",
    descripcion: "citrica ambarada."
  },
  {
    nombre: "Versace Pour Home",
    categoria: "hombres",
    img: "img/pour home.jpeg",
    descripcion: "citrico aromatico."
  },
  {
    nombre: "Eros Flame",
    categoria: "hombres",
    img: "img/eros flame.jpeg",
    descripcion: "amaderada especiada."
  },
  {
    nombre: "Eros Versace",
    categoria: "hombres",
    img: "img/eros versace.jpeg",
    descripcion: "aromatica avainillada."
  },
  {
    nombre: "Eros Energy",
    categoria: "hombres",
    img: "img/eros energy.jpeg",
    descripcion: "citrico."
  },
  {
    nombre: "Tommy Hilfiger",
    categoria: "hombres",
    img: "img/tommy.jpeg",
    descripcion: "citrica aromatica."
  },
  {
    nombre: "Nautica",
    categoria: "hombres",
    img: "img/nautica.jpeg",
    descripcion: "amaderada acuatica."
  },
  {
    nombre: "Pure Xs",
    categoria: "hombres",
    img: "img/pure xs.jpeg",
    descripcion: "aromatica especiada."
  },
  {
    nombre: "Diesel Tatto",
    categoria: "hombres",
    img: "img/diessel tatto.jpeg",
    descripcion: "amaderada especiada."
  },
  {
    nombre: "Diesel Only The Brave",
    categoria: "hombres",
    img: "img/only.jpeg",
    descripcion: "citrica ambarada."
  },
  {
    nombre: "Diesel plus",
    categoria: "hombres",
    img: "img/diesel plus.jpeg",
    descripcion: "calido especiado citrico."
  },
  {
    nombre: "Capsulas Diesel",
    categoria: "hombres",
    img: "img/capsulas diesel.jpeg",
    descripcion: "variedad de referencias."
  },
  {
    nombre: "Creed Imperial",
    categoria: "hombres",
    img: "img/greed imperial.jpeg",
    descripcion: "marino citrico."
  },
  {
    nombre: "Creed Aventus",
    categoria: "hombres",
    img: "img/greed aventus.jpeg",
    descripcion: "chipre frutal."
  },
  {
    nombre: "Creed Silver",
    categoria: "hombres",
    img: "img/greed silver.jpeg",
    descripcion: "aromatico."
  },
  {
    nombre: "Creed Green Irish",
    categoria: "hombres",
    img: "img/greed green.jpeg",
    descripcion: "citrico ozonico."
  },
  {
    nombre: "Black Xs Afrodisiaca",
    categoria: "hombres",
    img: "img/xs afrodisiaca.jpeg",
    descripcion: "amielado especiado cuero."
  },
  {
    nombre: "Paris Hilton",
    categoria: "hombres",
    img: "img/paris hilton.jpeg",
    descripcion: "amaderada aromatico."
  },
  {
    nombre: "Black Xs L´exces",
    categoria: "hombres",
    img: "img/xs.jpeg",
    descripcion: "amaderada aromatica."
  },
  {
    nombre: "Black Xs",
    categoria: "hombres",
    img: "img/black xs.jpeg",
    descripcion: "ambar amaderada."
  },
  {
    nombre: "One Milliion",
    categoria: "hombres",
    img: "img/one miliion.jpeg",
    descripcion: "amaderada especiada."
  },
  {
    nombre: "One Millon Prive",
    categoria: "hombres",
    img: "img/one prive.jpeg",
    descripcion: "ambar amaderada."
  },
  {
    nombre: "One Millon Lucky",
    categoria: "hombres",
    img: "img/one lucky.jpeg",
    descripcion: "amaderada dulce."
  },
  {
    nombre: "One Millon Elixir",
    categoria: "hombres",
    img: "img/one elixir.jpeg",
    descripcion: "avainillado afrutado."
  },
  {
    nombre: "One Millon Royal",
    categoria: "hombres",
    img: "img/one royal.jpeg",
    descripcion: "calido especiado."
  },
  {
    nombre: "One Millon Martillada",
    categoria: "hombres",
    img: "img/one martillada.jpeg",
    descripcion: "calido especiado."
  },
  {
    nombre: "One Millon Parfum",
    categoria: "hombres",
    img: "img/one parfum.jpeg",
    descripcion: "floral blanco nardos."
  },
  {
    nombre: "One Millon Dados",
    categoria: "hombres",
    img: "img/one dados.jpeg",
    descripcion: "calido especiado."
  },
  {
    nombre: "Boss Night",
    categoria: "hombres",
    img: "img/boss night.jpeg",
    descripcion: "aromatica amaderada."
  },
  {
    nombre: "Boss Bottled",
    categoria: "hombres",
    img: "img/boss bottled.jpeg",
    descripcion: "amaderada especiada."
  },
  {
    nombre: "Boss Elixir",
    categoria: "hombres",
    img: "img/boss elixir.jpeg",
    descripcion: "amaderado ambar."
  },
  {
    nombre: "Boss unlimited",
    categoria: "hombres",
    img: "img/boss unlimited.jpeg",
    descripcion: "aromatica fougere."
  },
  {
    nombre: "Boss The Scent",
    categoria: "hombres",
    img: "img/the scent.jpeg",
    descripcion: "aromatica especiada."
  },
  {
    nombre: "Boss Imotion",
    categoria: "hombres",
    img: "img/imotion.jpeg",
    descripcion: "citrico fresco especiado."
  },
  {
    nombre: "Hugo Energise",
    categoria: "hombres",
    img: "img/hugo energized.jpeg",
    descripcion: "citrico aromatico."
  },
  {
    nombre: "Hugo Boss Verde",
    categoria: "hombres",
    img: "img/boss verde.jpeg",
    descripcion: "amaderado aromatico."
  },
  {
    nombre: "Bvlgary Man In Black",
    categoria: "hombres",
    img: "img/man in black.jpeg",
    descripcion: "amaderado ambar."
  },
  {
    nombre: "Bvlgary Man In Wood",
    categoria: "hombres",
    img: "img/man in wood.jpeg",
    descripcion: "amaderado aromatico."
  },
  {
    nombre: "Bvlgary Man Glacial",
    categoria: "hombres",
    img: "img/bvlgary man.jpeg",
    descripcion: "amaderado aromatico."
  },
  {
    nombre: "Bvlgary Aqva",
    categoria: "hombres",
    img: "img/bvlgary aqva.jpeg",
    descripcion: "citrico marino."
  },
  {
    nombre: "Bvlgary Blv",
    categoria: "hombres",
    img: "img/bvlgary.jpeg",
    descripcion: "calido espaciado."
  },
  {
    nombre: "Santal 33",
    categoria: "hombres",
    img: "img/santal 33.jpeg",
    descripcion: "amaderado de sandalo."
  },
  {
    nombre: "Swiss Army",
    categoria: "hombres",
    img: "img/swiss army.jpeg",
    descripcion: "aromatico fresco espaciado."
  },
  {
    nombre: "Armani Code",
    categoria: "hombres",
    img: "img/armani code.jpeg",
    descripcion: "fresco oriental y espaciado."
  },
  {
    nombre: "Bleu De Chanel",
    categoria: "hombres",
    img: "img/blue de chanel.jpeg",
    descripcion: "citrico amaderado."
  },
  {
    nombre: "Allure Sport",
    categoria: "hombres",
    img: "img/allure sport.jpeg",
    descripcion: "citrico aromatico."
  },
  {
    nombre: "Space Bomb",
    categoria: "hombres",
    img: "img/space bomb.jpeg",
    descripcion: "amaderada especiada."
  },
  {
    nombre: "Blue Seduction",
    categoria: "hombres",
    img: "img/blue seduction.jpeg",
    descripcion: "aromatico afrutado."
  },
  {
    nombre: "Gio Profondo",
    categoria: "hombres",
    img: "img/gio profondo.jpeg",
    descripcion: "aromatico marino."
  },
  {
    nombre: "Aqua Di Gio",
    categoria: "hombres",
    img: "img/aqua di gio.jpeg",
    descripcion: "citrico aromatico."
  },
  {
    nombre: "Gio Profumo",
    categoria: "hombres",
    img: "img/gio profumo.jpeg",
    descripcion: "aromatico acuatico."
  },
  {
    nombre: "Gio Parfum",
    categoria: "hombres",
    img: "img/gio parfum.jpeg",
    descripcion: "aromatico marino."
  },
  {
    nombre: "360°",
    categoria: "hombres",
    img: "img/360.jpeg",
    descripcion: "aromatico especiada."
  },
  {
    nombre: "360° RED",
    categoria: "hombres",
    img: "img/360 red.jpeg",
    descripcion: "citrico especiada."
  },
  {
    nombre: "Issey Miyake",
    categoria: "hombres",
    img: "img/miyake.jpeg",
    descripcion: "citrico acuatico amaderado."
  },
  {
    nombre: "Issey Miyake Nuit",
    categoria: "hombres",
    img: "img/issey.jpeg",
    descripcion: "ambar avainillado."
  },
  {
    nombre: "Lacoste Red",
    categoria: "hombres",
    img: "img/lacoste red.jpeg",
    descripcion: "aromatico fourege."
  },
  {
    nombre: "Lacoste Rouge",
    categoria: "hombres",
    img: "img/lacoste rouge.jpeg",
    descripcion: "amaderada especiada."
  },
  {
    nombre: "Lacoste Negra",
    categoria: "hombres",
    img: "img/lacoste negra.jpeg",
    descripcion: "amaderado aromatico."
  },
  {
    nombre: "Lacoste Verde",
    categoria: "hombres",
    img: "img/lacoste verde.jpeg",
    descripcion: "citrico aromatico."
  },
  {
    nombre: "Lacoste Blanca",
    categoria: "hombres",
    img: "img/lacoste blanca.jpeg",
    descripcion: "cirica amaderada."
  },
  {
    nombre: "Lacoste Essential",
    categoria: "hombres",
    img: "img/lacoste essential.jpeg",
    descripcion: "citrico aromatico."
  },
  {
    nombre: "Lacoste Energized",
    categoria: "hombres",
    img: "img/lacoste energized.jpeg",
    descripcion: "verde aromatica."
  },
  {
    nombre: "Lacoste Azul",
    categoria: "hombres",
    img: "img/lacoste azul.jpeg",
    descripcion: "aromatico citrico."
  },
  {
    nombre: "Invictus",
    categoria: "hombres",
    img: "img/invictus 2.jpeg",
    descripcion: "amaderada acuatica."
  },
  {
    nombre: "Invictus Victory",
    categoria: "hombres",
    img: "img/victory.jpeg",
    descripcion: "avainillado ambar dulce."
  },
  {
    nombre: "Invictus Legend",
    categoria: "hombres",
    img: "img/invictus legend.jpeg",
    descripcion: "amaderada aromatica."
  },
  {
    nombre: "Invictus Aqua",
    categoria: "hombres",
    img: "img/invictus aqua.jpeg",
    descripcion: "amaderada acuatica."
  },
   {
    nombre: "Invictus Intense",
    categoria: "hombres",
    img: "img/invictus intense.jpeg",
    descripcion: "ambar whisky fresco especiado."
  },
  {
    nombre: "Invictus Onyx",
    categoria: "hombres",
    img: "img/onyx.jpeg",
    descripcion: "amaderada citrica."
  },
  {
    nombre: "Invictus Victory Elixir",
    categoria: "hombres",
    img: "img/invictus victory.jpeg",
    descripcion: "calido especiado ambar."
  },
  {
    nombre: "Invictus Parfum",
    categoria: "hombres",
    img: "img/invictus.jpeg",
    descripcion: "aromatico amizclado."
  },
  {
    nombre: "The One",
    categoria: "hombres",
    img: "img/the one.jpeg",
    descripcion: "amaderada especiada."
  },
  {
    nombre: "Light Blue",
    categoria: "hombres",
    img: "img/dolce light.jpeg",
    descripcion: "citrico aromatico."
  },
  {
    nombre: "K Dolce Gabbana",
    categoria: "hombres",
    img: "img/dolce.jpeg",
    descripcion: "aromatico amaderado."
  },
  {
    nombre: "Light Blue Italian Zest",
    categoria: "hombres",
    img: "img/light blue.jpeg",
    descripcion: "citrico y fresco especiado."
  },
  {
    nombre: "Sauvage Dior",
    categoria: "hombres",
    img: "img/sauvage dior.jpeg",
    descripcion: "aromatico fourege."
  },
  {
    nombre: "Fahrenheit",
    categoria: "hombres",
    img: "img/fahrenheit.jpeg",
    descripcion: "aromatico fourege."
  },
  {
    nombre: "Dior Homme Intense",
    categoria: "hombres",
    img: "img/dior homme.jpeg",
    descripcion: "iris amaderado."
  },
  {
    nombre: "Sauvage Elixir",
    categoria: "hombres",
    img: "img/sauvage elixir.jpeg",
    descripcion: "calido especiado fresco especiado."
  },{
    nombre: "Moshino Toy Boy",
    categoria: "hombres",
    img: "img/moschino toy.jpeg",
    descripcion: "amaderado aromatico."
  },
  {
    nombre: "Eternity",
    categoria: "hombres",
    img: "img/eternity.jpeg",
    descripcion: "aromatica fourege."
  },
  {
    nombre: "Scandal",
    categoria: "hombres",
    img: "img/scandal.jpeg",
    descripcion: "ambar amaderada."
  },
  {
    nombre: "Scandal Absolute",
    categoria: "hombres",
    img: "img/scandal absolute.jpeg",
    descripcion: "amaderado afrutado."
  },
  {
    nombre: "Bad Boy",
    categoria: "hombres",
    img: "img/bad boy.jpeg",
    descripcion: "ambar especiado."
  },
  {
    nombre: "212 Wild Party",
    categoria: "hombres",
    img: "img/212 wild.jpeg",
    descripcion: "amaderada especiada."
  },
  {
    nombre: "212 Vip Men",
    categoria: "hombres",
    img: "img/212 vip.jpeg",
    descripcion: "ambar amaderado."
  },
  {
    nombre: "212 Vip Wins",
    categoria: "hombres",
    img: "img/ch vip wins.jpeg",
    descripcion: "fresco especiado citrico."
  },
  {
    nombre: "CH Afrika",
    categoria: "hombres",
    img: "img/ch afrika.jpeg",
    descripcion: "amaderada especiada."
  },
  {
    nombre: "CH MEN",
    categoria: "hombres",
    img: "img/ch men.jpeg",
    descripcion: "ambar especiada."
  },
  {
    nombre: "CH Prive Men",
    categoria: "hombres",
    img: "img/the one.jpeg",
    descripcion: "calido especiado y cuero."
  },
  {
    nombre: "212 Men",
    categoria: "hombres",
    img: "img/212 men.jpeg",
    descripcion: "citrico verde metalica."
  },
  {
    nombre: "212 Vip Black",
    categoria: "hombres",
    img: "img/212 vip black.jpeg",
    descripcion: "aromatico avainillado."
  },
  {
    nombre: "212 Sexy",
    categoria: "hombres",
    img: "img/212 sexy.jpeg",
    descripcion: "avainillado amaderado."
  },
  {
    nombre: "212 Vip Black Red",
    categoria: "hombres",
    img: "img/212 vip red.jpeg",
    descripcion: "calido especiado aromatico."
  },
  {
    nombre: "212 Heroes",
    categoria: "hombres",
    img: "img/212 heroes.jpeg",
    descripcion: "aromatico afrutado."
  },
  {
    nombre: "Jean Paul Ultramale",
    categoria: "hombres",
    img: "img/jean ultramale.jpeg",
    descripcion: "avainillado afrutado."
  },
  {
    nombre: "Jean Paul Lemale",
    categoria: "hombres",
    img: "img/lemale.jpeg",
    descripcion: "avainillado aromatico."
  },
  {
    nombre: "Jean Paul Le Beau",
    categoria: "hombres",
    img: "img/le beau.jpeg",
    descripcion: "coco avainillado."
  },
  {
    nombre: "Jean Paul Le Beau Parfum",
    categoria: "hombres",
    img: "img/jean le beau.jpeg",
    descripcion: "dulce amaderado."
  },
  {
    nombre: "Jean Paul Lemale Elixir",
    categoria: "hombres",
    img: "img/jean lemale.jpeg",
    descripcion: "avainillado dulce."
  },
  {
    nombre: "Jean Paul Paradise Garden",
    categoria: "hombres",
    img: "img/jean paradise.jpeg",
    descripcion: "verde coco."
  },
  {
    nombre: "Jean Pascal Caja",
    categoria: "hombres",
    img: "img/jean caja.jpeg",
    descripcion: "amaderdo musgoso."
  },
  {
    nombre: "Jean Pascal Cuero",
    categoria: "hombres",
    img: "img/jean pascal.jpeg",
    descripcion: "amaderado musgoso."
  },
  {
    nombre: "Mont Blanc Emblemed",
    categoria: "hombres",
    img: "img/mont emblemed.jpeg",
    descripcion: "calido especiado aromatico."
  },
  {
    nombre: "Mont Blanc Legend",
    categoria: "hombres",
    img: "img/mont black.jpeg",
    descripcion: "afrutado dulce."
  },
  {
    nombre: "Mont Blanc Legend Spirit",
    categoria: "hombres",
    img: "img/mont spirit.jpeg",
    descripcion: "citrico acuatico."
  },
  {
    nombre: "Mont Blanc Legend Red",
    categoria: "hombres",
    img: "img/mont red.jpeg",
    descripcion: "citrico amaderado."
  },
  {
    nombre: "Valentino Uomo",
    categoria: "hombres",
    img: "img/valentino uomo.jpeg",
    descripcion: "amaderado."
  },
  {
    nombre: "Valentino Born In Roma",
    categoria: "hombres",
    img: "img/valentino.jpeg",
    descripcion: "avainillado lavanda."
  },
  {
    nombre: "Phantom",
    categoria: "hombres",
    img: "img/phantom.jpeg",
    descripcion: "citrico avainillado."
  },
  {
    nombre: "Arsenal Gris",
    categoria: "hombres",
    img: "img/arsenal gris.jpeg",
    descripcion: "amaderado aromatico."
  },
  {
    nombre: "cool Water",
    categoria: "hombres",
    img: "img/cool water.jpeg",
    descripcion: "aromatico verde."
  },
  {
    nombre: "Azzaro By Night",
    categoria: "hombres",
    img: "img/azzaro by night.jpeg",
    descripcion: "calido especido canela."
  },
  {
    nombre: "Lapidus",
    categoria: "hombres",
    img: "img/lapidus.jpeg",
    descripcion: "amaderado dulce."
  },
  {
    nombre: "Ferrari Black",
    categoria: "hombres",
    img: "img/ferrari black.jpeg",
    descripcion: "afrutado avainillado."
  },
  {
    nombre: "Blue Label Givenchy",
    categoria: "hombres",
    img: "img/blue label.jpeg",
    descripcion: "fresco especiado citrico."
  },
  {
    nombre: "CK One",
    categoria: "hombres",
    img: "img/ck one.jpeg",
    descripcion: "citrico verde ."
  },
  {
    nombre: "Ckin2u",
    categoria: "hombres",
    img: "img/ckin2u.jpeg",
    descripcion: "aromatico citrico."
  },
  {
    nombre: "Herrera",
    categoria: "hombres",
    img: "img/herrera.jpeg",
    descripcion: "aromatico fresco especiado."
  },
  {
    nombre: "OHM",
    categoria: "hombres",
    img: "img/ohm.jpeg",
    descripcion: "aromatico citrico."
  },
  {
    nombre: "Solo",
    categoria: "hombres",
    img: "img/solo.jpeg",
    descripcion: "cuero fresco."
  },
  {
    nombre: "Dorsay",
    categoria: "hombres",
    img: "img/dorsay.jpeg",
    descripcion: "amaderado aromatico."
  },
  {
    nombre: "Temptation",
    categoria: "hombres",
    img: "img/temptation.jpeg",
    descripcion: "herbal maderoso."
  },
  {
    nombre: "Maria Farina",
    categoria: "hombres",
    img: "img/farina citrico.jpeg",
    descripcion: "aromatico citrico."
  },
  {
    nombre: "Maria Farina 1 Litro",
    categoria: "hombres",
    img: "img/maria farina.jpeg",
    descripcion: "aromatico citrico."
  },
  {
    nombre: "212 Men Aqua",
    categoria: "hombres",
    img: "img/212 men.jpeg",
    descripcion: "amaderado calido especiado."
  },
  {
    nombre: "Intenso Dolce Gabanna",
    categoria: "hombres",
    img: "img/intenso.jpeg",
    descripcion: "aromatico fresco especiado."
  },
  {
    nombre: "Gucci Flora",
    categoria: "mujeres",
    img: "img/gucci flora.png",
    descripcion: "floral blanco frutal."
  },
  {
    nombre: "Dylan Blue",
    categoria: "mujeres",
    img: "img/dylan bluemujer.png",
    descripcion: "floral frutal."
  },
  {
    nombre: "Dylan Purple",
    categoria: "mujeres",
    img: "img/dylan purple.png",
    descripcion: "floral frutal."
  },
  {
    nombre: "Guess",
    categoria: "mujeres",
    img: "img/guess.png",
    descripcion: "floral afrutados."
  },
  {
    nombre: "Heires",
    categoria: "mujeres",
    img: "img/heires.jpg",
    descripcion: "floral frutal."
  },
  {
    nombre: "Dazlee",
    categoria: "mujeres",
    img: "img/dazlee.jpg",
    descripcion: "floral frutal."
  },
  {
    nombre: "CAN CAN",
    categoria: "mujeres",
    img: "img/can can.jpg",
    descripcion: "floral frutal."
  },
  {
    nombre: "Paris Hilton",
    categoria: "mujeres",
    img: "img/paris hiltonmujer.jpg",
    descripcion: "floral frutal."
  },
  {
    nombre: "Scada Sorbeto",
    categoria: "mujeres",
    img: "img/scada soberto.jpg",
    descripcion: "acuatico frutal."
  },
  {
    nombre: "Poison Dior",
    categoria: "mujeres",
    img: "img/poison dior.jpg",
    descripcion: "dulce frutal."
  },
  {
    nombre: "Ilmin Rosso Estuche",
    categoria: "mujeres",
    img: "img/ilmin rosso estuche.png",
    descripcion: " rosas."
  },
  {
    nombre: "Ilmin Femme Estuche",
    categoria: "mujeres",
    img: "img/ilmin femme estuche.png",
    descripcion: "amaderado dulce."
  },
  {
    nombre: "Good Girl Supreme",
    categoria: "mujeres",
    img: "img/good girl supreme.jpg",
    descripcion: "ambar floral."
  },
  {
    nombre: "Good Girl Glorius Gold",
    categoria: "mujeres",
    img: "img/good girl glorius.jpg",
    descripcion: "ambar floral."
  },
  {
    nombre: "Good Girl",
    categoria: "mujeres",
    img: "img/good girl.jpg",
    descripcion: "oriental floral."
  },
  {
    nombre: "Good Girl Fantastic Pink",
    categoria: "mujeres",
    img: "img/good girl fantastic.jpg",
    descripcion: "ambar floral."
  },
  {
    nombre: "Good Girl Legere ",
    categoria: "mujeres",
    img: "img/good girl legere.jpg",
    descripcion: "floral frutal."
  },
  {
    nombre: "Moshino Funny",
    categoria: "mujeres",
    img: "img/moshino funny.jpg",
    descripcion: "citrico floral."
  },
  {
    nombre: "Good Girl Very",
    categoria: "mujeres",
    img: "img/good girl very.jpg",
    descripcion: "floral frutal."
  },
  {
    nombre: "Fame",
    categoria: "mujeres",
    img: "img/fame.jpg",
    descripcion: "amizcle floral."
  },
  {
    nombre: "Good Girl Dazlinng Garden",
    categoria: "mujeres",
    img: "img/good girl dazling.jpg",
    descripcion: "floral blanco."
  },
  {
    nombre: "Ariana Rem",
    categoria: "mujeres",
    img: "img/ariana rem.jpg",
    descripcion: "dulce lavanda."
  },
  {
    nombre: "Thank You Next 2.0",
    categoria: "mujeres",
    img: "img/dulce frutal.jpg",
    descripcion: "dulce frutal."
  },
  {
    nombre: "Mod Ariana Grande",
    categoria: "mujeres",
    img: "img/mod ariana grande.jpg",
    descripcion: "vainilla dulce."
  },
  {
    nombre: "Chance Chanel Tendre",
    categoria: "mujeres",
    img: "img/chanel tendre.jpg",
    descripcion: "floral frutal."
  },
  {
    nombre: "Chance Chanel",
    categoria: "mujeres",
    img: "img/chance chanel.jpg",
    descripcion: "chipre floral."
  },
  {
    nombre: "Chance Chanel Fraiche",
    categoria: "mujeres",
    img: "img/chipre froral.jpg",
    descripcion: "chipre floral."
  },
  {
    nombre: "Fantasy",
    categoria: "mujeres",
    img: "img/fantasy.jpg",
    descripcion: "floral frutal ."
  },
  {
    nombre: "Thank You Next",
    categoria: "mujeres",
    img: "img/ariana next.jpg",
    descripcion: "floral frutal gourmand ."
  },
  {
    nombre: "Ariana Grande Cloud",
    categoria: "mujeres",
    img: "img/ariana grande cloud.jpg",
    descripcion: "floral frutal gourmand ."
  },
  {
    nombre: "Bombshell Victoria",
    categoria: "mujeres",
    img: "img/bombshell victoria.jpg",
    descripcion: "floral frutal."
  },
  {
    nombre: "Bombshell seduction",
    categoria: "mujeres",
    img: "img/bombshell seduction.jpg",
    descripcion: "amizclado frutal."
  },
  {
    nombre: "Bombshell Intense",
    categoria: "mujeres",
    img: "img/bobmshell intense.jpg",
    descripcion: "floral cereza."
  },
  {
    nombre: "Tommy",
    categoria: "mujeres",
    img: "img/tommymujer.jpg",
    descripcion: "floral citrus."
  },
  {
    nombre: "Miss Dior",
    categoria: "mujeres",
    img: "img/miss dior.jpg",
    descripcion: "floral rosas."
  },
  {
    nombre: "Halloween",
    categoria: "mujeres",
    img: "img/halloween.jpg",
    descripcion: "ambar floral."
  },
  {
    nombre: "Flor De Kenzo",
    categoria: "mujeres",
    img: "img/flor de kenzo.jpg",
    descripcion: "ambar floral."
  },
  {
    nombre: "Euphoria Calvin Klein",
    categoria: "mujeres",
    img: "img/euphoria calvin.jpg",
    descripcion: "ambar floral."
  },
  {
    nombre: "Eternity Dama",
    categoria: "mujeres",
    img: "img/eternity dama.jpg",
    descripcion: "floral."
  },
  {
    nombre: "CH",
    categoria: "mujeres",
    img: "img/ch mujer.jpg",
    descripcion: "ambar frutal."
  },
  {
    nombre: "Angel Y Demon",
    categoria: "mujeres",
    img: "img/angel y demon.jpg",
    descripcion: "ambar floral."
  },
  {
    nombre: "Aqua Di Giola",
    categoria: "mujeres",
    img: "img/aqua di giolamujer.jpg",
    descripcion: "floral acuatica."
  },
  {
    nombre: "Ilmin Femme",
    categoria: "mujeres",
    img: "img/ilmin femme.jpg",
    descripcion: "ambar amaderado."
  },
  {
    nombre: "360",
    categoria: "mujeres",
    img: "img/360mujer.jpg",
    descripcion: "floral."
  },
  {
    nombre: "360 Coral",
    categoria: "mujeres",
    img: "img/360 coral.jpg",
    descripcion: "ambar floral."
  },
  {
    nombre: "360 Purple",
    categoria: "mujeres",
    img: "img/360 purple.jpg",
    descripcion: "floral frutal gourmand ."
  },
  {
    nombre: "360 Red",
    categoria: "mujeres",
    img: "img/360 redmujer.jpg",
    descripcion: "floral."
  },
  {
    nombre: "Scandal",
    categoria: "mujeres",
    img: "img/scandalmujer.jpg",
    descripcion: "amielado."
  },
  {
    nombre: "Vie Est Bella",
    categoria: "mujeres",
    img: "img/vie est.jpg",
    descripcion: "ambar floral."
  },
  {
    nombre: "Ralph Lauren",
    categoria: "mujeres",
    img: "img/ralph lauren.jpg",
    descripcion: "fibral frutal."
  },
  {
    nombre: "Decadense",
    categoria: "mujeres",
    img: "img/decadence.jpg",
    descripcion: "ambar floral."
  },
  {
    nombre: "My Burberry",
    categoria: "mujeres",
    img: "img/my burberry.jpg",
    descripcion: "floral."
  },
  {
    nombre: "Olimpea",
    categoria: "mujeres",
    img: "img/olimpea.png",
    descripcion: "avainillado salado."
  },
  {
    nombre: "Light Blue",
    categoria: "mujeres",
    img: "img/light bluemujer.jpg",
    descripcion: "citrico floral."
  },
  {
    nombre: "212",
    categoria: "mujeres",
    img: "img/212 mujer.jpg",
    descripcion: "floral blanco."
  },
  {
    nombre: "212 Vip Rose",
    categoria: "mujeres",
    img: "img/212 vip rose.jpg",
    descripcion: "afrutado floral."
  },
  {
    nombre: "212 Vip Rose Red",
    categoria: "mujeres",
    img: "img/212 vip redmujer.jpg",
    descripcion: "floral frutal."
  },
  {
    nombre: "212 Vip Wild Party",
    categoria: "mujeres",
    img: "img/212 party mujer.jpg",
    descripcion: "floral frutal gourmand ."
  },
  {
    nombre: "212 Vip",
    categoria: "mujeres",
    img: "img/ambar avainillada.jpg",
    descripcion: "ambar vainilla."
  },
  {
    nombre: "Carolin Herrera",
    categoria: "mujeres",
    img: "img/carolina herrera.jpg",
    descripcion: "floral."
  },
  {
    nombre: "Meow Katty Perry",
    categoria: "mujeres",
    img: "img/meow.jpg",
    descripcion: "frutal."
  },
  {
    nombre: "Coco Chanel",
    categoria: "mujeres",
    img: "img/coco chanel.jpg",
    descripcion: "ambar floral."
  },
  {
    nombre: "Angel",
    categoria: "mujeres",
    img: "img/angel.jpg",
    descripcion: "floral frutal."
  },
  {
    nombre: "Can Can Burlesqui",
    categoria: "mujeres",
    img: "img/can can burlesqui.jpg",
    descripcion: "floral frutal."
  },
  {
    nombre: "Bright Cristal",
    categoria: "mujeres",
    img: "img/bright cristal.jpg",
    descripcion: "floral fresco."
  },
  {
    nombre: "Yellow Diamond",
    categoria: "mujeres",
    img: "img/yellow diamond.jpg",
    descripcion: "citrico floral."
  },
  {
    nombre: "Touch Pink",
    categoria: "mujeres",
    img: "img/touch pink.jpg",
    descripcion: "citrico atalcado."
  },
  {
    nombre: "Sparkling",
    categoria: "mujeres",
    img: "img/sparkling.jpg",
    descripcion: "dulce caramelado."
  },
  {
    nombre: "Sweet Candy",
    categoria: "mujeres",
    img: "img/sweet candy.jpg",
    descripcion: "frutal floral."
  },
  {
    nombre: "Lacoste Natural",
    categoria: "mujeres",
    img: "img/lacoste natural.jpg",
    descripcion: "dulce frutal."
  },
  {
    nombre: "Issey Miyake",
    categoria: "mujeres",
    img: "img/issey miyake mujer.jpg",
    descripcion: "floral."
  },
  {
    nombre: "Lady Million",
    categoria: "mujeres",
    img: "img/lady millon.jpg",
    descripcion: "."
  },
  {
    nombre: "Jadore",
    categoria: "mujeres",
    img: "img/jadore.jpg",
    descripcion: "floral blanco."
  },
  {
    nombre: "Jadore infinissime",
    categoria: "mujeres",
    img: "img/jadore infinissime.jpg",
    descripcion: "floral blanco."
  },
  {
    nombre: "Omnia Cristal",
    categoria: "mujeres",
    img: "img/omnia cristal.jpg",
    descripcion: "amaderado floral."
  },
  {
    nombre: "Omnia Amatista",
    categoria: "mujeres",
    img: "img/omnia amatista.jpg",
    descripcion: "floral frutal gourmand ."
  },
  {
    nombre: "Omnia Paraiba",
    categoria: "mujeres",
    img: "img/omnia paraiba.jpg",
    descripcion: "afrutado tropical."
  },
  {
    nombre: "Omnia Coral",
    categoria: "mujeres",
    img: "img/omnia coral.jpg",
    descripcion: "floral amaderado."
  },
  {
    nombre: "Omnia Cristal (nueva presentacion)",
    categoria: "mujeres",
    img: "img/omnia cristal 2.jpg",
    descripcion: "amaderado floral."
  },
  {
    nombre: "Omnia Amatista (nueva presentacion)",
    categoria: "mujeres",
    img: "img/omnia amatista 2.jpg",
    descripcion: "atalcado arcoiris ."
  },
  {
    nombre: "Vida Es Bella Elixir",
    categoria: "mujeres",
    img: "img/vida es bella.jpg",
    descripcion: "afrutado Ozonico."
  },
  {
    nombre: "Omnia Coral (nueva presentacion)",
    categoria: "mujeres",
    img: "img/omnia coral 2.jpg",
    descripcion: "floral amaderado."
  },
  {
    nombre: "Flower Bomb",
    categoria: "mujeres",
    img: "img/flowerbomb.png",
    descripcion: "floral pachuli."
  },
  {
    nombre: "Pony 2",
    categoria: "mujeres",
    img: "img/pony 2.png",
    descripcion: "afrutado avainillado."
  },
  {
    nombre: "Moshino Store",
    categoria: "mujeres",
    img: "img/moshino store.png",
    descripcion: "afrutado."
  },
  {
    nombre: "Moshino Teddy",
    categoria: "mujeres",
    img: "img/moshino teddy.png",
    descripcion: "afrutado."
  },
  {
    nombre: "Organza",
    categoria: "mujeres",
    img: "img/organza.png",
    descripcion: "floral blanco."
  },
  {
    nombre: "Touch",
    categoria: "mujeres",
    img: "img/touch.png",
    descripcion: "floral atalcado."
  },
  {
    nombre: "Valentino Donna ",
    categoria: "mujeres",
    img: "img/valentino donna.png",
    descripcion: "amaderado avainillado."
  },
  {
    nombre: "Paris Rose Rush",
    categoria: "mujeres",
    img: "img/paris rose.png",
    descripcion: "rosas tropicales."
  },
  {
    nombre: "Viva La Juicy",
    categoria: "mujeres",
    img: "img/viva la juici.jpg",
    descripcion: "floral frutal."
  },
  {
    nombre: "Pure XS",
    categoria: "mujeres",
    img: "img/pure xs mujer.jpg",
    descripcion: "ambar floral."
  },
  {
    nombre: "Moshino Toy 2",
    categoria: "mujeres",
    img: "img/moshino toy 2mujer.jpg",
    descripcion: "amizcle floral amaderado."
  },
  {
    nombre: "Moshino Bubble Gum",
    categoria: "mujeres",
    img: "img/moshino bubblegum.jpg",
    descripcion: "floral frutal."
  },
  {
    nombre: "Lacoste Elegant",
    categoria: "mujeres",
    img: "img/lacoste elegant.jpg",
    descripcion: "fresco atalcado."
  },
  {
    nombre: "Dkny Delicious",
    categoria: "mujeres",
    img: "img/dkny.jpg",
    descripcion: "verde afrutado."
  },
  {
    nombre: "Dior Addict",
    categoria: "mujeres",
    img: "img/dior addict.png",
    descripcion: "avainillado floral blanco."
  },
  {
    nombre: "The One",
    categoria: "mujeres",
    img: "img/the one mujer.jpg",
    descripcion: "floral blanco frutal."
  },
  {
    nombre: "Tous Leau",
    categoria: "mujeres",
    img: "img/tous leau m.jpg",
    descripcion: "floral citrico."
  },
  {
    nombre: "Tous Leau Verde",
    categoria: "mujeres",
    img: "img/tous leau verde.jpg",
    descripcion: "citrico amaderado."
  },
  {
    nombre: "Ari Ariana Grande",
    categoria: "mujeres",
    img: "img/frutal dulce.jpg",
    descripcion: "frutal dulce."
  },
  {
    nombre: "Moshino Love",
    categoria: "mujeres",
    img: "img/moshino love.jpg",
    descripcion: "citrico."
  },
  {
    nombre: "Lataffa Yara",
    categoria: "arabes",
    img: "img/lataffa yara.png",
  },
  {
    nombre: "Lataffa Yara Asad",
    categoria: "arabes",
    img: "img/lataffa yara asad.png",
  },
  {
    nombre: "Lataffa Yara Tous",
    categoria: "arabes",
    img: "img/lataffa yara tous.png",
  },
  {
    nombre: "Lataffa Yara Moi",
    categoria: "arabes",
    img: "img/lataffa yara moi.png",
  },
  {
    nombre: "Lataffa Yara Asad",
    categoria: "arabes",
    img: "img/lataffa yara asad.png",
  },
  {
    nombre: "Lataffa Yara ZanZibar",
    categoria: "arabes",
    img: "img/lataffa yara.png",
  },
  {
    nombre: "Lataffa Yara Candy",
    categoria: "arabes",
    img: "img/lataffa yara candy.png",
  },
  {
    nombre: "Orientica Royal Bleu",
    categoria: "arabes",
    img: "img/orientica royal bleu.jpg",
  },
  {
    nombre: "Orientica Oud Safron",
    categoria: "arabes",
    img: "img/orientica oud safron.jpg",
  },
  {
    nombre: "Orientica Royal Amber",
    categoria: "arabes",
    img: "img/orientica royal amber.jpg",
  },
  {
    nombre: "Orientica Amber Rouge",
    categoria: "arabes",
    img: "img/orientica amber rouge.jpg",
  },
  {
    nombre: "Orientica Velvelt Gold",
    categoria: "arabes",
    img: "img/orientica velvet gold.jpg",
  },
  {
    nombre: "Orientica Amber Noir",
    categoria: "arabes",
    img: "img/orientica amber noir.jpg",
  },
  {
    nombre: "Orientica Azzure Fantasy",
    categoria: "arabes",
    img: "img/orientica azzure fantasy.png",
  },
  {
    nombre: "Anna Al Awwal",
    categoria: "arabes",
    img: "img/ana al awwal.jpg",
  },
  {
    nombre: "Anna Al Awwal",
    categoria: "arabes",
    img: "img/ana al awwal 2.jpg",
  },
  {
    nombre: "Anna Al Awway",
    categoria: "arabes",
    img: "img/ana al awwal 3.jpg",
  },
  {
    nombre: "Anna Al Awway",
    categoria: "arabes",
    img: "img/ana al awwal 4.jpg",
  },
  {
    nombre: "Penhaligon Lord George",
    categoria: "arabes",
    img: "img/penhaligon lord george.jpg",
  },
  {
    nombre: "Penhaligon MR Sam",
    categoria: "arabes",
    img: "img/penhaligon mr sam.jpg",
  },
  {
    nombre: "Penhaligon Teddy",
    categoria: "arabes",
    img: "img/penhaligon teddy.jpg",
  },
  {
    nombre: "Penhaligon The Duke",
    categoria: "arabes",
    img: "img/penhaligon the duke.jpg",
  },
  {
    nombre: "9 PM",
    categoria: "arabes",
    img: "img/9 pm.jpg",
    descripcion:"metal."
  },
  {
    nombre: "9 AM Estuche",
    categoria: "arabes",
    img: "img/9 am estuche.png",
  },
  {
    nombre: "9 PM Estuche",
    categoria: "arabes",
    img: "img/9 pm estuche.png",
  },
  {
    nombre: "9 AM Dive",
    categoria: "arabes",
    img: "img/9 am dive.png",
  },
  {
    nombre: "Xerjoff Erba Pura Caja",
    categoria: "arabes",
    img: "img/xerjoff.png",
  },
  {
    nombre: "Ghala Zayed",
    categoria: "arabes",
    img: "img/ghala zayed.png",
  },
  {
    nombre: "Gao Xerjoff Caja 100ml",
    categoria: "arabes",
    img: "img/gao xerjoff.png",
  },
  {
    nombre: "Khamrah Estuche",
    categoria: "arabes",
    img: "img/kamrah.png",
  },
  {
    nombre: "Khamrah Qawa Caja",
    categoria: "arabes",
    img: "img/kamrah qawa caja.png",
  },
  {
    nombre: "Lataffa Ajwad",
    categoria: "arabes",
    img: "img/lataffa ajwad.jpg",
  },
  {
    nombre: "lataffa Qaed Fursan",
    categoria: "arabes",
    img: "img/lataffa qaed fursan.jpg",
  },
  {
    nombre: "Lataffa Haya",
    categoria: "arabes",
    img: "img/lataffa haya.png",
  },
  {
    nombre: "Lataffa Mayar",
    categoria: "arabes",
    img: "img/lataffa mayar.png",
  },
  {
    nombre: "Lataffa Ramz Gold-Silver",
    categoria: "arabes",
    img: "img/lataffa ramz.png",
  },
  {
    nombre: "lataffa عربيزي",
    categoria: "arabes",
    img: "img/lataffa rosa.png",
  },
  {
    nombre: "lataffa Ameer Al Oudh ",
    categoria: "arabes",
    img: "img/lataffa ameer al.png",
  },
  {
    nombre: "lataffa Najdia",
    categoria: "arabes",
    img: "img/lataffa najdia.png",
  },
  {
    nombre: "Hayaati Women",
    categoria: "arabes",
    img: "img/hayaati women.png",
  },
  {
    nombre: "One Man Show",
    categoria: "arabes",
    img: "img/one man show.png",
  },
  {
    nombre: "Oud Al Maashaer",
    categoria: "arabes",
    img: "img/oud al mashaer.png",
  },
  {
    nombre: "Armani Prive Musc Shamal",
    categoria: "arabes",
    img: "img/armanni prime musc.png",
  },
  {
    nombre: "lataffa Nebras",
    categoria: "arabes",
    img: "img/lataffa nebras.png",
  },
  {
    nombre: "lataffa Fhakar",
    categoria: "arabes",
    img: "img/lataffa fhakar.png",
  },
  {
    nombre: "Ghala Zayed Caja",
    categoria: "arabes",
    img: "img/ghala zayed caja.png",
  },
  {
    nombre: "Ghala Zayed Caja",
    categoria: "arabes",
    img: "img/ghala zayed caja2.png",
  },
  {
    nombre: "Oud Al Sultan",
    categoria: "arabes",
    img: "img/oud al sultan.png",
  },
  {
    nombre: "Lord",
    categoria: "arabes",
    img: "img/lord.png",
  },
  {
    nombre: "Black Phantom Killian",
    categoria: "arabes",
    img: "img/black phantom killian.png",
  },
  {
    nombre: "Oud Al Maleki",
    categoria: "arabes",
    img: "img/oud lail maleki.png",
  },
  {
    nombre: "Maryam",
    categoria: "arabes",
    img: "img/maryam.png",
  },
  {
    nombre: "Lataffa Emaan",
    categoria: "arabes",
    img: "img/lataffa emaan.png",
  },
  {
    nombre: "Lataffa Mayar Natural Intense",
    categoria: "arabes",
    img: "img/lataffa mayar natural.png",
  },
  {
    nombre: "كلمات األغنية",
    categoria: "arabes",
    img: "img/arabe.png",
  },
  {
    nombre: "Monastery R10",
    categoria: "arabes",
    img: "img/monastery rio.png",
  },
  {
    nombre: "Moshino Pearl",
    categoria: "arabes",
    img: "img/moshino pearl.png",
  },
  {
    nombre: "Club De Nuit",
    categoria: "arabes",
    img: "img/club de nuit.png",
  },
  {
    nombre: "Club De Nuit Urban",
    categoria: "arabes",
    img: "img/club de nuit urban.png",
  },
  {
    nombre: "Club De Nuit Dama",
    categoria: "arabes",
    img: "img/club de nuit dama.png",
  },
  {
    nombre: "Ilmin Kakuno 30ml",
    categoria: "arabes",
    img: "img/ilmin kakuno.png",
  },
  {
    nombre: "Ilmin Femme 30ml",
    categoria: "arabes",
    img: "img/ilmin femme 30.png",
  },
  {
    nombre: "Ilmin Rosso",
    categoria: "arabes",
    img: "img/ilmin rosso arabe.png",
  },
  {
    nombre: "Bharara King Estuche",
    categoria: "arabes",
    img: "img/bharara king.jpg",
  },
  {
    nombre: "Bharara Niche Femme",
    categoria: "arabes",
    img: "img/bharara niche.jpg",
  },
  {
    nombre: "Baharara Blue Estuche",
    categoria: "arabes",
    img: "img/bharara blue.jpg",
  },
  {
    nombre: "Bharara King Parfum",
    categoria: "arabes",
    img: "img/bharara king parfum.png",
  },
  {
    nombre: "Bharara Rose",
    categoria: "arabes",
    img: "img/bharara rose.png",
  },
  {
    nombre: "Baharara Onyx",
    categoria: "arabes",
    img: "img/bharara onyx.png",
  },
  {
    nombre: "Ilmin Rosso Kakuno Femme",
    categoria: "arabes",
    img: "img/ilmin rosso kakuno.jpg",
  },
  {
    nombre: "Tom Ford Oud Wood",
    categoria: "arabes",
    img: "img/tom ford oud wood.jpg",
  },
  {
    nombre: "Layton De Marly",
    categoria: "arabes",
    img: "img/layton de marly.jpg",
  },
  {
    nombre: "Icon Antonio Banderas",
    categoria: "arabes",
    img: "img/icon antonio.png",
  },
  {
    nombre: "Lataffa Oud Glory Estuche",
    categoria: "arabes",
    img: "img/lataffa oud glory.png",
  },
  {
    nombre: "Lataffa Amatista Estuche",
    categoria: "arabes",
    img: "img/lataffa amatista.png",
  },
  {
    nombre: "Lataffa Honor y Glory Estuche",
    categoria: "arabes",
    img: "img/lataffa honor.png",
  },
  {
    nombre: "Lataffa Sublime Estuche",
    categoria: "arabes",
    img: "img/lataffa sublime.png",
  },
  {
    nombre: "Haramain Amber Oud Estuche",
    categoria: "arabes",
    img: "img/haramain amber.png",
  },
  {
    nombre: "Haramain Rouge Estuche",
    categoria: "arabes",
    img: "img/haramain rouge.jpg",
  },
  {
    nombre: "Mont Blanc Explorer Platinum",
    categoria: "arabes",
    img: "img/mont black explorer.jpg",
  },
  {
    nombre: "Bond Blecker",
    categoria: "arabes",
    img: "img/bond bleecker.jpg",
  },
  {
    nombre: "bharara Viking Dubai",
    categoria: "arabes",
    img: "img/bharara viking dubai.jpg",
  },
  {
    nombre: "Bharara Viking Khasmir",
    categoria: "arabes",
    img: "img/bharara viking khasmir.jpg",
  },
  {
    nombre: "Bharara Viking Cairo",
    categoria: "arabes",
    img: "img/bharara viking cairo.jpg",
  },
  {
    nombre: "Bharara Viking Beirut",
    categoria: "arabes",
    img: "img/bharara viking beirut.png",
  },
  {
    nombre: "Tom Ford Ombre",
    categoria: "arabes",
    img: "img/tom ford ombre.png",
  },
  {
    nombre: "Tom Ford Cherry Smoke",
    categoria: "arabes",
    img: "img/tom ford cherry smoke.png",
  },
  {
    nombre: "Phantom Black",
    categoria: "arabes",
    img: "img/phantom black arabe.png",
  },
  {
    nombre: "Mandarin Sky",
    categoria: "arabes",
    img: "img/mandarin sky.png",
  },
  {
    nombre: "Philipp Plein",
    categoria: "arabes",
    img: "img/philipp plein.png",
  },
  {
    nombre: "Ana Abiyedh",
    categoria: "arabes",
    img: "img/ana abiyedh.png",
  },
  {
    nombre: "األغني",
    categoria: "arabes",
    img: "img/arabe 2.png",
  },
  {
    nombre: "Lataffa Mahir Legacy",
    categoria: "arabes",
    img: "img/lataffa mahir legacy.jpg",
  },
  {
    nombre: "Lataffa Mahir",
    categoria: "arabes",
    img: "img/lataffa mahir.jpg",
  },
  {
    nombre: "Lataffa Mahir Black",
    categoria: "arabes",
    img: "img/lataffa mahir black.png",
  },
  {
    nombre: "Shahen Gold",
    categoria: "arabes",
    img: "img/shahen gold.png",
  },
  {
    nombre: "Shahen Silver",
    categoria: "arabes",
    img: "img/shahen silver.png",
  },
  {
    nombre: "Delina Estuche",
    categoria: "arabes",
    img: "img/delina estuche.jpg",
  },
  {
    nombre: "Initio Estuche",
    categoria: "arabes",
    img: "img/initio estuche.png",
  },
  {
    nombre: "Valentino Intense",
    categoria: "arabes",
    img: "img/valentino intense.jpg",
  },
  {
    nombre: "Hyati",
    categoria: "arabes",
    img: "img/hayati.jpg",
  },
  {
    nombre: "Khaltat Night",
    categoria: "arabes",
    img: "img/khaltat  night.png",
  },
  {
    nombre: "Cristal Love",
    categoria: "arabes",
    img: "img/cristal love.png",
  },
  {
    nombre: "Hawas Men",
    categoria: "arabes",
    img: "img/hawas men.png",
  },
  {
    nombre: "Hawas Dama",
    categoria: "arabes",
    img: "img/hawas dama.png",
  },
  {
    nombre: "Ahli Vega",
    categoria: "arabes",
    img: "img/ahli vega.jpg",
  },
  {
    nombre: "Ahli Karpos",
    categoria: "arabes",
    img: "img/ahli karpos.jpg",
  },
];

const contenedor = document.getElementById("productos");
const filtro = document.getElementById("filtro");

function mostrarProductos(categoria = "todos") {
  contenedor.innerHTML = "";
  const filtrados = categoria === "todos" ? productos : productos.filter(p => p.categoria === categoria);

  filtrados.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
  <img src="${p.img}" alt="${p.nombre}" loading="lazy" onclick="abrirImagen('${p.img}', '${p.nombre}')">
  <h3>${p.nombre}</h3>
  <p>${p.descripcion}</p>
  <button onclick="contactar('${p.nombre}')">Contactar</button>
`;
    contenedor.appendChild(card);
  });
}

function contactar(nombre) {
  const numero = "573161038271";
  const mensaje = encodeURIComponent(`Hola, estoy interesado en el perfume "${nombre}". ¿Me puedes dar más información?`);
  window.open(`https://wa.me/${numero}?text=${mensaje}`, "_blank");
}

filtro.addEventListener("change", () => mostrarProductos(filtro.value));
mostrarProductos();
document.addEventListener('DOMContentLoaded', function() {
  // Agregar event listeners a los enlaces del menú
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Prevenir comportamiento predeterminado del enlace
      e.preventDefault();
      
      // Quitar clase activa de todos los enlaces
      navLinks.forEach(l => l.classList.remove('active'));
      
      // Añadir clase activa al enlace actual
      this.classList.add('active');
      
      // Obtener el id del enlace (que corresponde a la categoría)
      const targetId = this.getAttribute('href').substring(1);
      
      // Remover el título de categoría anterior si existe
      const tituloAnterior = document.querySelector('.categoria-titulo');
      if (tituloAnterior) {
        tituloAnterior.remove();
      }
      
      // Aplicar filtro según la sección seleccionada
      if (targetId === 'inicio') {
        // Si es inicio, mostrar todos y hacer scroll hacia arriba
        window.scrollTo({ top: 0, behavior: 'smooth' });
        mostrarProductos('todos');
        filtro.value = 'todos';
      } else if (targetId === 'hombres' || targetId === 'mujeres' || targetId === 'arabes') {
        // Filtrar por categoría y actualizar el selector
        mostrarProductos(targetId);
        filtro.value = targetId;
        // Hacer scroll al contenedor de productos
        document.getElementById('productos').scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});

function toggleMenu() {
  const navLinks = document.querySelector('nav ul');
  navLinks.classList.toggle("show");
}

