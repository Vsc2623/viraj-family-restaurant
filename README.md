# Viraj Family Restaurant — Maharashtra Edition (V1)

A local restaurant ordering learning project inspired by Maharashtrian family restaurants.

## V1 features
- Restaurant-branded React + Vite frontend.
- Searchable menu with category filters.
- Maharashtrian snacks, breakfast, street food, meals, rice/biryani, South Indian dishes, drinks and desserts.
- Sample INR prices and vegetarian/non-vegetarian indicators.
- Spring Boot catalog, order and simulated-payment services.
- PostgreSQL databases and persistent Docker volume.
- Docker Compose local deployment.

## Run on Ubuntu
```bash
cp .env.example .env
chmod 600 .env
docker compose up --build -d
docker compose ps
```
Open http://localhost:5173.

## API endpoints
- Catalog: http://localhost:8081/api/products
- Orders: http://localhost:8082/api/orders
- Payments: http://localhost:8083/api/payments
- Health endpoints: `/actuator/health` on each service.

## Important notes
- All menu prices are illustrative sample prices, not verified Viraj Family Restaurant prices.
- Food descriptions and dietary classifications are draft data; confirm ingredients, preparation, availability and cross-contamination information before publishing.
- Payment is simulated only. No real payment gateway or money movement.
- This is a local learning MVP, not production-ready. Customer authentication, secure admin controls, delivery integration, inventory and production hardening are future versions.
- The catalog seeder inserts missing products only; it does not delete existing products.
- `docker compose down -v` deletes the PostgreSQL volume and its data. Do not run it unless you intentionally want to erase the database.
