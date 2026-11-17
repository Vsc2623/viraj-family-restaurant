package com.foodhub.catalogservice;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.math.BigDecimal;
import java.util.List;
@Configuration public class SeedData {
 @Bean CommandLineRunner seed(ProductRepository repo){return args->{
  List<Product> menu=List.of(
   new Product("Vada Pav","Mumbai-style batata vada, dry garlic chutney and soft pav",new BigDecimal("25.00"),true),
   new Product("Misal Pav","Matki usal topped with farsan, onion and pav",new BigDecimal("90.00"),true),
   new Product("Pav Bhaji","Buttery mixed-vegetable bhaji with toasted pav",new BigDecimal("120.00"),true),
   new Product("Kanda Poha","Traditional Maharashtrian breakfast with peanuts and lemon",new BigDecimal("50.00"),true),
   new Product("Sabudana Khichdi","Tapioca pearls with peanuts, potato and mild spices",new BigDecimal("80.00"),true),
   new Product("Kothimbir Vadi","Crispy coriander and gram-flour savoury bites",new BigDecimal("80.00"),true),
   new Product("Sabudana Vada","Golden fried tapioca and peanut patties",new BigDecimal("80.00"),true),
   new Product("Kanda Bhaji","Crispy onion fritters served with chutney",new BigDecimal("70.00"),true),
   new Product("Thalipeeth","Multigrain Maharashtrian flatbread with curd",new BigDecimal("90.00"),true),
   new Product("Zunka Bhakri","Traditional gram-flour zunka with jowar bhakri",new BigDecimal("130.00"),true),
   new Product("Pithla Bhakri","Homestyle pithla with jowar bhakri and thecha",new BigDecimal("140.00"),true),
   new Product("Bharli Vangi","Maharashtrian stuffed brinjal curry with chapati",new BigDecimal("160.00"),true),
   new Product("Shev Bhaji","Spicy Maharashtrian curry topped with shev",new BigDecimal("150.00"),true),
   new Product("Veg Thali","Seasonal sabzi, dal, rice, chapati, salad and pickle",new BigDecimal("180.00"),true),
   new Product("Chicken Thali","Chicken curry, rice, chapati, salad and accompaniments",new BigDecimal("250.00"),true),
   new Product("Chicken Rassa","Traditional spicy chicken curry",new BigDecimal("190.00"),true),
   new Product("Mutton Rassa","Maharashtrian-style mutton curry",new BigDecimal("280.00"),true),
   new Product("Veg Biryani","Fragrant rice with vegetables and raita",new BigDecimal("160.00"),true),
   new Product("Chicken Biryani","Spiced chicken dum biryani with raita",new BigDecimal("220.00"),true),
   new Product("Dal Khichdi","Comforting rice and lentil khichdi with tadka",new BigDecimal("120.00"),true),
   new Product("Masala Dosa","Crisp dosa with potato masala, sambar and chutney",new BigDecimal("110.00"),true),
   new Product("Idli Sambar","Steamed idli served with sambar and chutney",new BigDecimal("70.00"),true),
   new Product("Veg Sandwich","Fresh vegetable sandwich with green chutney",new BigDecimal("80.00"),true),
   new Product("Dabeli","Kutchi dabeli with masala peanuts and chutneys",new BigDecimal("40.00"),true),
   new Product("Bhel Puri","Puffed rice, chutneys, onion and crunchy sev",new BigDecimal("60.00"),true),
   new Product("Sol Kadhi","Cooling kokum and coconut milk drink",new BigDecimal("45.00"),true),
   new Product("Taak","Chilled spiced Maharashtrian buttermilk",new BigDecimal("30.00"),true),
   new Product("Gulab Jamun","Soft milk-solid dumplings in sugar syrup",new BigDecimal("50.00"),true),
   new Product("Shrikhand","Creamy sweetened hung curd with saffron and cardamom",new BigDecimal("70.00"),true),
   new Product("Batata Vada","Crisp potato fritter served with chutney",new BigDecimal("20.00"),true),
   new Product("Onion Pakoda","Crispy onion fritters with green chutney",new BigDecimal("70.00"),true),
   new Product("Puri Bhaji","Fluffy puris with homestyle potato bhaji",new BigDecimal("90.00"),true),
   new Product("Matar Usal Pav","Green pea curry served with pav",new BigDecimal("80.00"),true),
   new Product("Upma","Soft semolina breakfast with vegetables",new BigDecimal("50.00"),true),
   new Product("Sheera","Warm semolina sweet with ghee and nuts",new BigDecimal("50.00"),true),
   new Product("Medu Vada","South Indian lentil fritters with sambar",new BigDecimal("70.00"),true),
   new Product("Plain Dosa","Crisp dosa served with sambar and chutney",new BigDecimal("90.00"),true),
   new Product("Sev Puri","Mumbai street snack with chutneys and sev",new BigDecimal("60.00"),true),
   new Product("Pani Puri","Crisp puris with spiced flavoured water",new BigDecimal("50.00"),true),
   new Product("Ragda Pattice","Potato patties topped with white pea curry",new BigDecimal("90.00"),true),
   new Product("Masala Pav","Spiced buttery masala served with pav",new BigDecimal("100.00"),true),
   new Product("Cheese Pav Bhaji","Mumbai pav bhaji topped with cheese",new BigDecimal("150.00"),true),
   new Product("Mumbai Toast Sandwich","Toasted vegetable sandwich with chutney",new BigDecimal("90.00"),true),
   new Product("Matki Usal","Traditional sprouted moth bean curry",new BigDecimal("110.00"),true),
   new Product("Vangyache Bharit","Roasted brinjal mash with Maharashtrian spices",new BigDecimal("140.00"),true),
   new Product("Special Maharashtrian Thali","Seasonal bhaji, amti, rice, chapati, bhakri and sides",new BigDecimal("220.00"),true),
   new Product("Kombdi Vade","Maharashtrian chicken curry with vade",new BigDecimal("260.00"),true),
   new Product("Mutton Biryani","Aromatic rice cooked with spiced mutton",new BigDecimal("280.00"),true),
   new Product("Jeera Rice","Steamed rice tempered with cumin",new BigDecimal("90.00"),true),
   new Product("Masala Rice","Maharashtrian-style spiced rice",new BigDecimal("110.00"),true),
   new Product("Masale Bhat","Traditional Maharashtrian spiced rice",new BigDecimal("130.00"),true),
   new Product("Veg Pulao","Fragrant rice with seasonal vegetables",new BigDecimal("130.00"),true),
   new Product("Uttapam","Soft rice and lentil pancake with vegetables",new BigDecimal("100.00"),true),
   new Product("Kokum Sharbat","Refreshing sweet and tangy kokum drink",new BigDecimal("40.00"),true),
   new Product("Sweet Lassi","Chilled sweet yoghurt drink",new BigDecimal("60.00"),true),
   new Product("Mango Lassi","Mango yoghurt drink",new BigDecimal("80.00"),true),
   new Product("Basundi","Slow-cooked sweetened milk dessert",new BigDecimal("90.00"),true),
   new Product("Puran Poli","Traditional sweet lentil-stuffed flatbread",new BigDecimal("70.00"),true)
  );
  var existing=repo.findAll().stream().map(p->p.getName().toLowerCase()).collect(java.util.stream.Collectors.toSet());
  for(Product item:menu) if(!existing.contains(item.getName().toLowerCase())) repo.save(item);
 };}
}
