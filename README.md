# Bynry-Services-Backend-Developer-Assigment
A Repo Have Solution For Given Assignment

# Task 1 -: Code Review And Debugging

# Identify Issues (Technical & Business Logic)
- 	SKU uniqueness is not checked before creating new product
- 	price not explicitly handled as decimal
-   No use of try/catch block error handling / rollback if inventory insert fails
-   Not doing input validation to check if data fields are missing or incorrect
-   not sending http status code with res object
-   warehouse_id is directly stored in Product — but products can exist in multiple warehouses. This breaks normalization.
-   try to commit transaction two times which is wrong

# Impact
- 	Duplicate SKUs may break order systems, cause incorrect lookups
- 	Price may be stored as float leading to precision issues
- 	If inventory insert fails, product still exists – causing data inconsistency
- 	Can crash API or store bad data in DB
-   Client doesn't know if it's a success/failure clearly
-   Can overwrite existing inventory or inflate counts

