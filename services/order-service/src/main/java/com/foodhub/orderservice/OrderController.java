package com.foodhub.orderservice;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController @RequestMapping("/api/orders") @CrossOrigin(origins="http://localhost:5174")
public class OrderController {
 private final OrderRepository repo; private final CatalogClient catalog;
 public OrderController(OrderRepository r,CatalogClient c){repo=r;catalog=c;}
 @GetMapping public List<CustomerOrder> list(){return repo.findAll();}
 @GetMapping("/{id}") public CustomerOrder get(@PathVariable Long id){return repo.findById(id).orElseThrow(()->new IllegalArgumentException("Order not found"));}
 @PostMapping @ResponseStatus(HttpStatus.CREATED) public CustomerOrder create(@Valid @RequestBody CreateOrder r){
  var p=catalog.get(r.productId()); if(!p.available())throw new IllegalArgumentException("Product unavailable");
  return repo.save(new CustomerOrder(r.customerName(),p.id(),p.name(),r.quantity(),p.price()));
 }
 public record CreateOrder(@NotBlank @Size(max=120) String customerName,@NotNull @Positive Long productId,@NotNull @Min(1) @Max(20) Integer quantity){}
}
