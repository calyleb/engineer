export const CLEANUP = `
      DROP SCHEMA public CASCADE
`

export const CREATE_SCHEMA = `
      CREATE SCHEMA public
`
export const HANDLE_GRANTS = `
      GRANT ALL ON SCHEMA public TO postgres;
      GRANT ALL ON SCHEMA public TO public;
      COMMENT ON SCHEMA public IS 'standard public schema';
`

export const CREATE_USERS_TABLE = `CREATE TABLE IF NOT EXISTS users(
  id INT GENERATED ALWAYS AS IDENTITY,
  role boolean,
  user_nickname VARCHAR(255) NOT NULL UNIQUE,
  user_name VARCHAR(255) NOT NULL,
  user_surname VARCHAR(255) NOT NULL,
  user_password VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_phone VARCHAR(255) NOT NULL UNIQUE,
  user_adress VARCHAR(255) NOT NULL,
  PRIMARY KEY(id)
  )`

export const CREATE_ORDERS_TABLE = `CREATE TABLE IF NOT EXISTS orders(
      id INT GENERATED ALWAYS AS IDENTITY,
      user_id INT NOT NULL,
      cart_id INT NOT NULL,
      status VARCHAR(255) NOT NULL,
      shipping_type VARCHAR(255) NOT NULL,
      content TEXT,
      create_at DATE NOT NULL,
      update_at DATE NOT NULL,
      PRIMARY KEY(id),
      CONSTRAINT fk_user
            FOREIGN KEY(user_id) 
            REFERENCES users(id),
      CONSTRAINT fk_shopping_cart
            FOREIGN KEY(cart_id) 
            REFERENCES shopping_cart(id)
      )`

export const CREATE_PRODUCTS_TABLE = `CREATE TABLE IF NOT EXISTS products(
      id INT GENERATED ALWAYS AS IDENTITY,
      category_id INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      size VARCHAR(255),
      color VARCHAR(255),
      price FLOAT(4) NOT NULL,
      quantity INT,
      content TEXT,
      create_at DATE NOT NULL,
      update_at DATE NOT NULL,
      PRIMARY KEY(id),
      CONSTRAINT fk_category
            FOREIGN KEY(category_id) 
            REFERENCES categories(id)
      )`

export const CREATE_PRODUCT_REVIEW_TABLE =`CREATE TABLE IF NOT EXISTS product_review(
      id INT GENERATED ALWAYS AS IDENTITY,
      user_id INT NOT NULL,
      product_id INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      rating INT NOT NULL,
      content TEXT,
      create_at DATE NOT NULL,
      update_at DATE NOT NULL,
      PRIMARY KEY(id),
      CONSTRAINT fk_product
            FOREIGN KEY(product_id) 
            REFERENCES products(id),
      CONSTRAINT fk_user
            FOREIGN KEY(user_id) 
            REFERENCES users(id)
      )`

export const CREATE_CATEGORIES_TABLE =`CREATE TABLE IF NOT EXISTS categories(
      id INT GENERATED ALWAYS AS IDENTITY,
      title VARCHAR(255) NOT NULL,
      content TEXT,
      create_at DATE NOT NULL,
      update_at DATE NOT NULL,
      PRIMARY KEY(id)
      )`
      

export const CREATE_SHOPPING_CART_TABLE =`CREATE TABLE IF NOT EXISTS shopping_cart(
      id INT GENERATED ALWAYS AS IDENTITY,
      user_id INT NOT NULL,
      cart_status BOOLEAN NOT NULL,
      PRIMARY KEY(id),
      CONSTRAINT fk_user
            FOREIGN KEY(user_id) 
            REFERENCES users(id)
      )`

export const CREATE_SHOPPING_CART_ITEM_TABLE =`CREATE TABLE IF NOT EXISTS shopping_cart_item(
      id INT GENERATED ALWAYS AS IDENTITY,
      product_id INT NOT NULL,
      shopping_cart_id INT NOT NULL,
      quantity FLOAT(4) NOT NULL,
      PRIMARY KEY(id),
      CONSTRAINT fk_product
            FOREIGN KEY(product_id) 
            REFERENCES products(id),
      CONSTRAINT fk_shoppingcart
            FOREIGN KEY(shopping_cart_id)
            REFERENCES shopping_cart(id)
      )`
      
export const CREATE_RETURNS_TABLE =`CREATE TABLE IF NOT EXISTS returns(
      id INT GENERATED ALWAYS AS IDENTITY,
      user_id INT NOT NULL,
      order_id INT NOT NULL,
      product_id INT NOT NULL,
      status VARCHAR(255) NOT NULL,
      create_at DATE NOT NULL,
      update_at DATE NOT NULL,
      PRIMARY KEY(id),
      CONSTRAINT fk_product
            FOREIGN KEY(product_id) 
            REFERENCES products(id),
      CONSTRAINT fk_user
            FOREIGN KEY(user_id)
            REFERENCES users(id),
      CONSTRAINT fk_order
            FOREIGN KEY(order_id)
            REFERENCES orders(id)
      )`

export const CREATE_COMPLAINTS_TABLE =`CREATE TABLE IF NOT EXISTS complaints(
      id INT GENERATED ALWAYS AS IDENTITY,
      user_id INT NOT NULL,
      order_id INT NOT NULL,
      product_id INT NOT NULL,
      reason TEXT,
      status VARCHAR(255) NOT NULL,
      PRIMARY KEY(id),
      create_at DATE NOT NULL,
      update_at DATE NOT NULL,
      CONSTRAINT fk_product
            FOREIGN KEY(product_id) 
            REFERENCES products(id),
      CONSTRAINT fk_user
            FOREIGN KEY(user_id)
            REFERENCES users(id),
      CONSTRAINT fk_order
            FOREIGN KEY(order_id)
            REFERENCES orders(id)
      )`

export const CREATE_SUPPLIERS_TABLE =`CREATE TABLE IF NOT EXISTS suppliers(
      id INT GENERATED ALWAYS AS IDENTITY,
      supplier_name VARCHAR(255) NOT NULL UNIQUE,
      supplier_email VARCHAR(255) NOT NULL UNIQUE,
      supplier_phone VARCHAR(255) NOT NULL UNIQUE,
      supplier_adress VARCHAR(255) NOT NULL,
      PRIMARY KEY(id)
      )`
 
export const CREATE_SUPPLIES_TABLE =`CREATE TABLE IF NOT EXISTS supplies(
      id INT GENERATED ALWAYS AS IDENTITY,
      status VARCHAR(255) NOT NULL,
      supplier_id INT NOT NULL,
      create_at DATE NOT NULL,
      update_at DATE NOT NULL,
      PRIMARY KEY(id),
      CONSTRAINT fk_suppliers
            FOREIGN KEY(supplier_id) 
            REFERENCES suppliers(id)
      )`

export const CREATE_SUPPLIES_TO_PRODUCT_TABLE =`CREATE TABLE IF NOT EXISTS supplies_to_product(
      id INT GENERATED ALWAYS AS IDENTITY,
      supply_id INT NOT NULL,
      product_id INT NOT NULL,
      price FLOAT(4) NOT NULL,
      quantity INT NOT NULL,
      PRIMARY KEY(id),
      CONSTRAINT fk_product
            FOREIGN KEY(product_id) 
            REFERENCES products(id),
      CONSTRAINT fk_supplyid
            FOREIGN KEY(supply_id) 
            REFERENCES supplies(id)
      )`
                 
      
export const INIT_USERS = `INSERT INTO users(role, user_nickname, user_name, user_surname, user_password, user_email, user_phone, user_adress) 
      VALUES (TRUE, 'marher223', 'Marek', 'Marucha', 'lego22', 'marher223@xyz.com', '+48 777 888 999', 'ul. Pi??sudskiego 24/2 44-100 Gliwice'), 
      (FALSE,'mathqu8', 'Mateusz', 'Pietrucha', 'len282', 'math@xyz.com', '+48 888 878 799', 'ul. Pszczy??ska 100/9 44-100 Gliwice'),
      (FALSE,'smrek', 'Michal', 'Brek', 'calosc993', 'brek@xyz.com', '+48 690 808 799', 'ul. Bielska 30 43-400 Cieszyn'),
      (FALSE,'gurol33', 'Karol', 'Malys', 'gora13', 'maly@xyz.com', '+48 787 808 749', 'ul. Dworcowa 13/54 43-300 Bielsko-Bia??a'),
      (FALSE,'koron229', 'Bo??ydar', 'G??rski', 'adm8877', 'bdar@xyz.com', '+48 699 908 699', 'ul. Katowicka 30/2 90-000 ????d??')`

export const INIT_SUPPLIERS =`INSERT INTO suppliers(supplier_name, supplier_email, supplier_phone, supplier_adress)
      VALUES('Eagle Climbing', 'eaglestore@ec.com', '+48 990 101 900', 'ul. W??gorza 33 00-001 Warszawa'),
      ('yetik', 'yetik@yk.com', '+48 900 901 080', 'ul. Katowicka 48/2 00-001 Warszawa'),
      ('Falcon-ski', 'falcon-shop@falcon.com', '+48 790 601 900', 'ul. Krawiecka 24 00-001 Warszawa'),
      ('Curunner', 'curunner@cr.com', '+48 879 878 980', 'ul. Warszawska 2 40-000 Katowice'),
      ('Snow Beast', 'management@beast.com', '+48 989 875 343', 'ul. Mariacka 82 30-000 Krak??w')`

export const INIT_CATEGORIES=`INSERT INTO categories(title, content, create_at, update_at)
      VALUES('raki', 'Raki wspinaczkowe, turystyczne i raczki', '1/1/2022/', '5/2/2022'),
      ('narty', 'Narty zjazdowe, skiturowe, freeridowe i biegowe', '1/1/2022/', '7/2/2022'),
      ('kijki', 'Kijki narciarskie, skiturowe, turystyczne', '1/1/2022/', '6/2/2022'),
      ('kaski', 'Kaski wspinaczkowe i narciarskie', '1/1/2022/', '5/2/2022'),
      ('kurtki', 'Kurtki puchowe, softshellowe i hardshellowe', '1/1/2022/', '5/2/2022'),
      ('czekany', 'Czekany wspinaczkowe i turtystyczne', '1/1/2022', '3/2/2022'),
      ('spodnie', 'Spodnie wspinaczkowe, narciarskie, skiturowe i trekkingowe', '1/1/2022', '5/3/2022'),
      ('buty', 'Buty wspinaczkowe, narciarskie i trekkingowe', '1/1/2022', '3/3/2022')`
      
export const INIT_PRODUCTS = `INSERT INTO products(category_id, title, size, color, price, quantity, content, create_at, update_at)
      VALUES(1, 'raki wspinaczkowe ec-z', 's', 'zielony', 400.84, 10, 'Wytrzyma??e raki wspinaczkowe dla najbardziej wymagaj??cych wspinaczy i pasjonat??w g??rskich wyzwa??', '1/1/2022' , '1/1/2022'),
      (1, 'raki wspinaczkowe ec-r', 'l', 'czerwony', 421.84, 15, 'Wytrzyma??e raki wspinaczkowe dla najbardziej wymagaj??cych wspinaczy i pasjonat??w g??rskich wyzwa??', '1/1/2022' , '1/1/2022'),
      (2, 'narty freeride sb-yellow175', '175 cm','??????ty', 989.99, 10, 'Wspania??e narty freeridowe dla spragnionych skoku adrenaliny podczas wymagaj??cych szus??w po zboczach g??r', '1/1/2022' , '1/1/2022'),  
      (2, 'narty freeride sb-orange160', '160 cm','pomara??czowy', 974.99, 10, 'Wspania??e narty freeridowe dla spragnionych skoku adrenaliny podczas wymagaj??cych szus??w po zboczach g??r', '1/1/2022' , '1/1/2022'),
      (3, 'kijki narciarskie sb-120', '120 cm', 'niebieski', 560.99, 20, 'Wygodne i wytrzyma??e kijki narciarskie idealne do zjazd??w po trasach narciarskich, zboczach g??r, poza szlakami i wsz??dzie tam, gdzie da si?? wjecha?? na nartach', '1/1/2022' , '1/1/2022'), 
      (3, 'kijki narciarskie sb-135', '135 cm', 'niebieski', 599.99, 18, 'Wygodne i wytrzyma??e kijki narciarskie idealne do zjazd??w po trasach narciarskich, zboczach g??r, poza szlakami i wsz??dzie tam, gdzie da si?? wjecha?? na nartach', '1/1/2022' , '1/1/2022'),
      (4, 'kask narciarski sb-m', 'm', 'czarny', 299.99, 20, 'Wygodny i lekki kask narciarski, kt??ry ochroni Twoj?? g??ow?? w krytcznej sytuacji', '1/2/2022', '1/2/2022'),         
      (4, 'kask narciarski sb-l', 'l', 'czarny', 349.99, 15, 'Wygodny i lekki kask narciarski, kt??ry ochroni Twoj?? g??ow?? w krytcznej sytuacji', '1/2/2022', '1/2/2022'),
      (4, 'kask wspinaczkowy ec-m', 'm', 'czarny', 400.99, 15, 'Lekki i wytrzyma??y kask wspinaczkowy idealny na ??ciany skalne i do prac wysoko??ciowych', '1/2/2022', '1/2/2022'),
      (4, 'kask wspinaczkowy ec-l', 'l', 'czarny', 400.99, 15, 'Lekki i wytrzyma??y kask wspinaczkowy idealny na ??ciany skalne i do prac wysoko??ciowych', '1/2/2022', '1/2/2022'), 
      (2, 'narty falcon-gr175', '175 cm', 'zielony', 1699.99, 7, 'Sztywne i twarde narty dla mi??o??nik??w pr??dko??ci i energicznego ci??cia kraw??dziami pokrywy ??nie??nej', '1/5/2022' , '1/6/2022'),  
      (2, 'narty falcon-bl165', '165 cm', 'niebieski', 1577.99, 8, 'Sztywne i twarde narty dla mi??o??nik??w pr??dko??ci i energicznego ci??cia kraw??dziami pokrywy ??nie??nej', '1/5/2022' , '1/7/2022'),
      (5, 'kurtka puchowa yetik-m', 'm', 'czerwony', 909.99, 10, 'Ta lekka i bardzo ciep??a kurtka puchowa z g??siego puchu sprawi, ??e ka??dy zimowy wiecz??r b??dzie przyjemny', '1/7/2022', '1/9/2022'),
      (5, 'kurtka puchowa yetik-l', 'l', '??????ty', 909.99, 9, 'Ta lekka i bardzo ciep??a kurtka puchowa z g??siego puchu sprawi, ??e ka??dy zimowy wiecz??r b??dzie przyjemny', '1/7/2022', '1/9/2022'),
      (5, 'kurtka puchowa yetik-xl', 'xl', 'szary', 909.99, 8, 'Ta lekka i bardzo ciep??a kurtka puchowa z g??siego puchu sprawi, ??e ka??dy zimowy wiecz??r b??dzie przyjemny', '1/7/2022', '1/9/2022'),
      (5, 'kurtka softshellowa yetik-m', 'm', '??????ty', 600.99, 9, 'Wytrzyma??a kurtka softshellowa, kt??ra ochroni przed najzimniejszym wiatrem', '1/7/2022', '1/9/2022'),
      (5, 'kurtka softshellowa yetik-l', 'l', '??????ty', 600.99, 9, 'Wytrzyma??a kurtka softshellowa, kt??ra ochroni przed najzimniejszym wiatrem', '1/7/2022', '1/9/2022'),
      (5, 'kurtka softshellowa yetik-xl', 'xl', '??????ty', 600.99, 9, 'Wytrzyma??a kurtka softshellowa, kt??ra ochroni przed najzimniejszym wiatrem', '1/7/2022', '1/9/2022'),
      (6, 'czekan wspinaczkowy ec-o50', '50 cm', 'pomara??czowy', 621.84, 15, 'Agresywny i wygodny czekan wspinaczkowy, kt??ry nie pozwoli Ci odpa???? od ??ciany lodowej w najci????szych warunkach', '1/7/2022' , '1/10/2022'),
      (6, 'czekan wspinaczkowy ec-r60', '60 cm', 'czerwony', 700.84, 15, 'Agresywny i wygodny czekan wspinaczkowy, kt??ry nie pozwoli Ci odpa???? od ??ciany lodowej w najci????szych warunkach', '1/7/2022' , '1/10/2022'),
      (6, 'czekan wspinaczkowy ec-bl70', '70 cm', 'niebieski', 700.84, 15, 'Agresywny i wygodny czekan wspinaczkowy, kt??ry nie pozwoli Ci odpa???? od ??ciany lodowej w najci????szych warunkach', '1/7/2022' , '1/10/2022'),
      (1, 'raczki turystyczne cr-s', 's', 'zielony', 200.99 , 10, 'Lekkie i wytrzyma??e raczki turystyczne dla fan??w g??rskich wedr??wek zim??', '1/7/2022' , '19/10/2022'),
      (1, 'raczki turystyczne cr-m', 'm', 'czarny', 200.99 , 10, 'Lekkie i wytrzyma??e raczki turystyczne dla fan??w g??rskich wedr??wek zim??', '1/7/2022' , '20/10/2022'),
      (1, 'raczki turystyczne cr-l', 'l', 'niebieski', 200.99 , 10, 'Lekkie i wytrzyma??e raczki turystyczne dla fan??w g??rskich wedr??wek zim??', '1/7/2022' , '5/10/2022'),
      (1, 'raki koszykowe cr-s', 's', 'zielony', 360.99 , 10, 'Solidne i niezawodne raki koszykowe dla najbardziej wymagaj??cych zimowych w??drowc??w', '1/8/2022' , '1/10/2022'),
      (1, 'raki koszykowe cr-l', 'l', 'czarny', 360.99 , 20, 'Solidne i niezawodne raki koszykowe dla najbardziej wymagaj??cych zimowych w??drowc??w', '1/8/2022' , '1/10/2022'),
      (3, 'kijki trekkingowe cr-90-120', '90-120 cm', 'niebieski', 200.99, 10, 'Wygodne i lekkie kijki trekkingowe idealne do w??rd??wek po g??rskich szlakach', '1/8/2022' , '9/8/2022'),
      (3, 'kijki trekkingowe cr-100-130', '100-130 cm', 'zielony', 200.99, 10, 'Wygodne i lekkie kijki trekkingowe idealne do w??rd??wek po g??rskich szlakach', '1/8/2022' , '9/8/2022'),
      (3, 'kijki trekkingowe cr-100-140', '100-140 cm', 'fioletowy', 200.99, 10, 'Wygodne i lekkie kijki trekkingowe idealne do w??rd??wek po g??rskich szlakach', '1/8/2022' , '9/8/2022'),
      (7, 'spodnie wspinaczkowe ec-s', 's', 'szary', 160.00 , 10, 'Wygodne i ergonomiczne spodnie wspinaczkowe idealne na najbardziej wymagaj??ce trasy', '1/8/2022' , '9/8/2022'),
      (7, 'spodnie wspinaczkowe ec-m', 'm', 'szary', 160.00 , 30, 'Wygodne i ergonomiczne spodnie wspinaczkowe idealne na najbardziej wymagaj??ce trasy', '1/8/2022' , '9/8/2022'),
      (7, 'spodnie wspinaczkowe ec-l', 'l', 'szary', 160.00 , 20, 'Wygodne i ergonomiczne spodnie wspinaczkowe idealne na najbardziej wymagaj??ce trasy', '1/8/2022' , '9/8/2022'),
      (7, 'spodnie trekkingowe cr-s', 's', 'czerwony', 300.99 , 8, 'Dobrze dopasowane i oddychaj??ce spodnie trekkingowe, kt??re sprawi??, ??e ka??da w??dr??wka b??dzie o wiele bardziej komfortowa ni?? dotychczas', '1/8/2022' , '9/8/2022'),
      (7, 'spodnie trekkingowe cr-m', 'm', 'niebieski', 300.99 , 8, 'Dobrze dopasowane i oddychaj??ce spodnie trekkingowe, kt??re sprawi??, ??e ka??da w??dr??wka b??dzie o wiele bardziej komfortowa ni?? dotychczas', '1/8/2022' , '10/8/2022'),
      (7, 'spodnie trekkingowe cr-l', 'l', 'niebieski', 300.99 , 8, 'Dobrze dopasowane i oddychaj??ce spodnie trekkingowe, kt??re sprawi??, ??e ka??da w??dr??wka b??dzie o wiele bardziej komfortowa ni?? dotychczas', '1/8/2022' , '7/8/2022'),
      (8, 'buty trekkingowe cr-r-40', '40', 'czerwony', 700.99 , 9, 'Wygodne, oddychaj??ce i lekkie - takie s?? buty trekkingowe firmy Curunner. Sprawi?? one, ??e b??dziesz m??g?? zdoby?? wi??cej', '1/8/2022' , '9/8/2022'),
      (8, 'buty trekkingowe cr-r-41', '41', 'czerwony', 700.99 , 8, 'Wygodne, oddychaj??ce i lekkie - takie s?? buty trekkingowe firmy Curunner. Sprawi?? one, ??e b??dziesz m??g?? zdoby?? wi??cej', '1/8/2022' , '9/8/2022'),
      (8, 'buty trekkingowe cr-r-42', '42', 'czerwony', 700.99 , 9, 'Wygodne, oddychaj??ce i lekkie - takie s?? buty trekkingowe firmy Curunner. Sprawi?? one, ??e b??dziesz m??g?? zdoby?? wi??cej', '1/8/2022' , '9/8/2022'),
      (8, 'buty trekkingowe cr-r-43', '43', 'czerwony', 700.99 , 10, 'Wygodne, oddychaj??ce i lekkie - takie s?? buty trekkingowe firmy Curunner. Sprawi?? one, ??e b??dziesz m??g?? zdoby?? wi??cej', '1/8/2022' , '9/8/2022'),
      (8, 'buty trekkingowe cr-r-44', '44', 'czerwony', 700.99 , 14, 'Wygodne, oddychaj??ce i lekkie - takie s?? buty trekkingowe firmy Curunner. Sprawi?? one, ??e b??dziesz m??g?? zdoby?? wi??cej', '1/8/2022' , '9/8/2022'),
      (8, 'buty trekkingowe cr-r-45', '45', 'czerwony', 700.99 , 6, 'Wygodne, oddychaj??ce i lekkie - takie s?? buty trekkingowe firmy Curunner. Sprawi?? one, ??e b??dziesz m??g?? zdoby?? wi??cej', '1/8/2022' , '9/8/2022'),
      (8, 'buty trekkingowe cr-bl-40', '40', 'niebieski', 700.99 , 9, 'Wygodne, oddychaj??ce i lekkie - takie s?? buty trekkingowe firmy Curunner. Sprawi?? one, ??e b??dziesz m??g?? zdoby?? wi??cej', '1/8/2022' , '9/8/2022'),
      (8, 'buty trekkingowe cr-bl-41', '41', 'niebieski', 700.99 , 8, 'Wygodne, oddychaj??ce i lekkie - takie s?? buty trekkingowe firmy Curunner. Sprawi?? one, ??e b??dziesz m??g?? zdoby?? wi??cej', '1/8/2022' , '9/8/2022'),
      (8, 'buty trekkingowe cr-bl-42', '42', 'niebieski', 700.99 , 9, 'Wygodne, oddychaj??ce i lekkie - takie s?? buty trekkingowe firmy Curunner. Sprawi?? one, ??e b??dziesz m??g?? zdoby?? wi??cej', '1/8/2022' , '9/8/2022'),
      (8, 'buty trekkingowe cr-bl-43', '43', 'niebieski', 700.99 , 10, 'Wygodne, oddychaj??ce i lekkie - takie s?? buty trekkingowe firmy Curunner. Sprawi?? one, ??e b??dziesz m??g?? zdoby?? wi??cej', '1/8/2022' , '9/8/2022'),
      (8, 'buty trekkingowe cr-bl-44', '44', 'niebieski', 700.99 , 14, 'Wygodne, oddychaj??ce i lekkie - takie s?? buty trekkingowe firmy Curunner. Sprawi?? one, ??e b??dziesz m??g?? zdoby?? wi??cej', '1/8/2022' , '9/8/2022'),
      (8, 'buty trekkingowe cr-bl-45', '45', 'niebieski', 700.99 , 6, 'Wygodne, oddychaj??ce i lekkie - takie s?? buty trekkingowe firmy Curunner. Sprawi?? one, ??e b??dziesz m??g?? zdoby?? wi??cej', '1/8/2022' , '9/8/2022'),
      (8, 'buty trekkingowe cr-bl-45', '45', 'niebieski', 700.99 , 6, 'Wygodne, oddychaj??ce i lekkie - takie s?? buty trekkingowe firmy Curunner. Sprawi?? one, ??e b??dziesz m??g?? zdoby?? wi??cej', '1/8/2022' , '9/8/2022'),
      (8, 'buty wspinaczkowe ec-40', '40', 'zielony', 349.99 , 20, 'Bardzo lekkie i solidnie wykonane buty wspinaczkowe z bardzo przyczepn?? podeszw??. Nowe buty firmy Eagle Climbing pozwolaj?? poczu?? si?? stabilnie nawet na najmniejszych stopniach i wsz??dzie tam, gdzie potrzebne jest podparcie', '21/9/2022' , '4/10/2022'),
      (8, 'buty wspinaczkowe ec-41', '41', 'zielony', 349.99 , 10, 'Bardzo lekkie i solidnie wykonane buty wspinaczkowe z bardzo przyczepn?? podeszw??. Nowe buty firmy Eagle Climbing pozwolaj?? poczu?? si?? stabilnie nawet na najmniejszych stopniach i wsz??dzie tam, gdzie potrzebne jest podparcie', '21/9/2022' , '5/10/2022'),
      (8, 'buty wspinaczkowe ec-42', '42', 'zielony', 349.99 , 8, 'Bardzo lekkie i solidnie wykonane buty wspinaczkowe z bardzo przyczepn?? podeszw??. Nowe buty firmy Eagle Climbing pozwolaj?? poczu?? si?? stabilnie nawet na najmniejszych stopniach i wsz??dzie tam, gdzie potrzebne jest podparcie', '21/9/2022' , '26/10/2022'),
      (8, 'buty wspinaczkowe ec-43', '43', 'zielony', 349.99 , 12, 'Bardzo lekkie i solidnie wykonane buty wspinaczkowe z bardzo przyczepn?? podeszw??. Nowe buty firmy Eagle Climbing pozwolaj?? poczu?? si?? stabilnie nawet na najmniejszych stopniach i wsz??dzie tam, gdzie potrzebne jest podparcie', '21/9/2022' , '16/10/2022'),
      (8, 'buty wspinaczkowe ec-44', '44', 'zielony', 349.99 , 5, 'Bardzo lekkie i solidnie wykonane buty wspinaczkowe z bardzo przyczepn?? podeszw??. Nowe buty firmy Eagle Climbing pozwolaj?? poczu?? si?? stabilnie nawet na najmniejszych stopniach i wsz??dzie tam, gdzie potrzebne jest podparcie', '21/9/2022' , '8/10/2022'),
      (8, 'buty wspinaczkowe ec-45', '45', 'zielony', 349.99 , 20, 'Bardzo lekkie i solidnie wykonane buty wspinaczkowe z bardzo przyczepn?? podeszw??. Nowe buty firmy Eagle Climbing pozwolaj?? poczu?? si?? stabilnie nawet na najmniejszych stopniach i wsz??dzie tam, gdzie potrzebne jest podparcie', '21/9/2022' , '6/10/2022')`

export const INIT_SUPPLIES=`INSERT INTO supplies(status, supplier_id, create_at, update_at)
      VALUES('Przygotowywana do wysy??ki', 1,  '1/1/2022', '10/1/2022'),
      ('Wys??ana', 4,  '6/1/2022', '8/1/2022' ),
      ('Oczekiwanie na zap??at??', 4, '1/2/2022', '2/2/2022'),
      ('Dostarczona', 5, '1/2/2022', '2/3/2022')
      `
export const INIT_SUPPLIES_TO_PRODUCT =`INSERT INTO supplies_to_product(supply_id, product_id, price, quantity)
      VALUES(1, 53, 200, 15),
      (1, 51, 190, 12),
      (1, 52, 220, 8),
      (2, 48, 400, 14),
      (2, 47, 400, 14),
      (2, 44, 419,  11),
      (2, 43, 415, 12),
      (2, 42, 419, 11),
      (3, 41, 410, 14),
      (3, 40, 460, 6),
      (3, 39, 430, 10),
      (4, 3, 340, 6),
      (4, 4, 350, 5)`

export const INIT_SHOPPING_CART =`INSERT INTO shopping_cart(user_id, cart_status)
      VALUES(2, TRUE),
      (3, TRUE),
      (5, TRUE),
      (2, TRUE),
      (4, TRUE),
      (3, TRUE),
      (3, TRUE),
      (3, TRUE),
      (4, TRUE),
      (2, FALSE)`

export const INIT_SHOPPING_CART_ITEM =`INSERT INTO shopping_cart_item(product_id, shopping_cart_id, quantity)
      VALUES(3, 1, 2),
      (6, 1, 2),
      (7, 1, 2),
      (52, 2, 1),
      (10, 2, 1),
      (21, 3, 2),
      (31, 4, 1),
      (14, 4, 1),
      (18, 5, 1),
      (35, 5, 1),
      (37, 6, 4),
      (25, 7, 2),
      (27, 7, 3),
      (27, 7, 3),
      (11, 8, 5),
      (12, 8, 5),
      (6, 8, 4),
      (5, 8, 4),
      (46, 9, 1),
      (34, 9, 2),
      (1, 10, 6)`

export const INIT_ORDERS= `INSERT INTO orders(user_id, cart_id, status, shipping_type, content, create_at, update_at)
      VALUES(2, 1, 'Dostarczono', 'DHL', NULL, '1/2/2022', '5/2/2022'),
      (3, 2, 'Dostarczono', 'Paczkomat', NULL, '3/2/2022', '7/2/2022'),
      (5, 3, 'Dostarczono', 'Paczkomat za pobraniem', NULL, '5/2/2022', '8/2/2022'),
      (2, 4, 'Oczekiwanie na zap??at??', 'Pobranie DHL', NULL, '5/2/2022', '5/2/2022'),
      (4, 5, 'Przygotowywanie do wysy??ki', 'Paczkomat', NULL, '6/2/2022', '7/2/2022'),
      (3, 6, 'Wys??ane', 'DHL', 'Prosz?? o dostarczenie przesy??ki w godzinach popo??udniowych', '7/2/2022', '9/2/2022'),
      (3, 7, 'Oczekiwanie na zap??at??', 'Odbi??r osobisty', NULL, '15/2/2022', '15/2/2022'),
      (3, 8, 'Dostarczono', 'Paczkomat za pobraniem', NULL, '6/3/2022', '8/3/2022'),
      (4, 9, 'Anulowano', 'DHL', NULL, '7/3/2022', '9/3/2022')`
    
export const INIT_COMPLAINTS =`INSERT INTO complaints(user_id, order_id, product_id,reason,status, create_at, update_at)
       VALUES(2, 1, 7, 'Dzie?? dobry, chcia??bym z??o??y?? reklamacj?? na powy??szy kask. Po dw??ch wizytach na stoku zacz???? si?? rozkleja??, co moim zdaniem nie powinno mie?? miejsca po tak kr??tkim czasie', 'Oczekiwanie na przes??anie produktu', '14/2/2022', '15/2/2022'),
       (3, 8, 12, 'Witam, po odebraniu sprz??tu podczas dok??adnych ogl??dzinach nart zauwa??y??em, ??e na jednej z nart wyst??puje p??kni??cie wi??zania, narty nie by??y u??ywane. Prosz?? o wymian?? na nowe.', 'Reklamacja rozpatrywana', '15/2/2022', '18/2/2022')`

export const INIT_RETURNS =`INSERT INTO returns(user_id, order_id, product_id, status, create_at, update_at)
      VALUES(3, 2, 52, 'Zwrot rozpatrywany', '9/2/2022', '12/2/2022')`

export const INIT_PRODUCT_REVIEW=`INSERT INTO product_review(user_id, product_id, title, rating,content, create_at, update_at)
      VALUES(5, 21, 'Czekan, kt??ry przer??s?? moje oczekiwania', 5, 'Czekan od momentu zakupu towarzyszy mi na ka??dej wspinaczkowej wyprawie i musz?? przyzna??, ??e nie ma lekkiego ??ycia. Jest niezwykle ergonomiczny i wytrzyma??y. Polecam ka??demu', '28/2/2022', '28/2/2022' )`