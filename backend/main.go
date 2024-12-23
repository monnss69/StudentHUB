package main

import (
	"backend/interfaces"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	dsn := "host=localhost user=postgres password=Monnss234! dbname=postgres port=5432 sslmode=disable"

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	log.Println("Successfully connected to database!")

	// Declare a variable to store the result
	var category interfaces.Category

	// Get the first record
	result := db.Last(&category)
	if result.Error != nil {
		log.Fatal("Error fetching category:", result.Error)
	}

	// Print the result
	log.Printf("First category: %+v", category)
}
