package com.foodhub.paymentservice;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.List;
@RestController @RequestMapping("/api/payments") @CrossOrigin(origins="http://localhost:5174")
public class PaymentController {
 private final PaymentRepository repo;
 public PaymentController(PaymentRepository r){repo=r;}
 @GetMapping public List<Payment> list(){return repo.findAll();}
 @PostMapping @ResponseStatus(HttpStatus.CREATED) public Payment create(@Valid @RequestBody PaymentRequest r){
  if(repo.existsByOrderId(r.orderId()))throw new IllegalArgumentException("Payment already exists for this order");
  return repo.save(new Payment(r.orderId(),r.amount(),r.method()));
 }
 public record PaymentRequest(@NotNull @Positive Long orderId,@NotNull @DecimalMin("0.01") BigDecimal amount,@NotBlank @Pattern(regexp="DEMO") String method){}
}
