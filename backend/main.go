package main

import (
	"backend/db"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// Connect to database
	db.Initialize()

	router := gin.Default()

	// Set up CORS
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"}, // Your React app URL
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		AllowCredentials: true,
	}))

	// Route handling

	// Users Route
	router.POST("/users", db.CreateUser)
	router.DELETE("/users/:id", db.DeleteUser)
	router.GET("/users", db.GetAllUser)
	router.GET("/users/:id", db.GetUserID)

	// Post route
	router.POST("/post", db.CreatePost)
	router.DELETE("/post/:post_id", db.DeletePost)
	router.GET("/post/:post_id", db.GetPostID)
	router.PUT("/post/:post_id", db.EditPost)
	router.GET("/:category", db.GetCategoryPost)

	// Comment route
	router.GET("/comment/:post_id", db.GetCommentPost)

	// Category route
	router.GET("/category", db.GetCategory)

	router.Run(":3333")
}
