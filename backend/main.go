package main

import (
	"backend/auth"
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
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		AllowCredentials: true,
	}))

	// Route handling

	// Authentication
	router.POST("/auth", db.AuthenticateUser)
	router.POST("/auth/logout", db.LogOutUser)

	// Users Route
	router.POST("/users", db.CreateUser)
	router.DELETE("/users/:id", auth.AuthMiddleware(), db.DeleteUser)
	router.GET("/users", db.GetAllUser)
	router.GET("/users/:id", db.GetUserID)

	// Post route
	router.POST("/post", auth.AuthMiddleware(), db.CreatePost)
	router.DELETE("/post/:post_id", auth.AuthMiddleware(), db.DeletePost)
	router.GET("/post/:post_id", auth.AuthMiddleware(), db.GetPostID)
	router.PUT("/post/:post_id", auth.AuthMiddleware(), db.EditPost)
	router.GET("/:category", auth.AuthMiddleware(), db.GetCategoryPost)

	// Comment route
	router.GET("/comment/:post_id", auth.AuthMiddleware(), db.GetCommentPost)

	// Category route
	router.GET("/category", db.GetCategory)

	router.Run(":3333")
}
