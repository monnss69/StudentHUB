package main

import (
	"backend/db"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	db.Initialize()

	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"}, // Your React app URL
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		AllowCredentials: true,
	}))

	router.POST("/auth/register", db.CreateUser)
	router.GET("/users", db.GetAllUser)
	router.GET("/users/:id", db.GetUserID)
	router.GET("/post/:category", db.GetCategoryPost)
	router.Run(":3333")
}
