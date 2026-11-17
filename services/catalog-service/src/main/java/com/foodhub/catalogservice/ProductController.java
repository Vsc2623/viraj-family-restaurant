package com.foodhub.catalogservice;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.List;
@RestController @RequestMapping("/api/products") @CrossOrigin(origins="http://localhost:5174")
public class ProductController {
 private final ProductRepository repo;
 public ProductController(ProductRepository r){repo=r;}
 @GetMapping public List<Product> list(){return repo.findAll();}
 @GetMapping("/{id}") public Product get(@PathVariable Long id){return repo.findById(id).orElseThrow(()->new IllegalArgumentException("Product not found"));}
 @PostMapping @ResponseStatus(HttpStatus.CREATED) public Product create(@Valid @RequestBody ProductRequest r){return repo.save(new Product(r.name(),r.description(),r.price(),true));}
 @PutMapping("/{id}/availability") public Product availability(@PathVariable Long id,@RequestParam boolean available){Product p=get(id);p.setAvailable(available);return repo.save(p);}
 public record ProductRequest(@NotBlank @Size(max=120) String name,@Size(max=1000) String description,@NotNull @DecimalMin("0.01") BigDecimal price){}
}
