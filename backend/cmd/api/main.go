package main

import (
    "log"
    "net/http"
    "os"

    "github.com/gin-gonic/gin"
    "github.com/joho/godotenv"
    "gorm.io/gorm"
)

type App struct {
    DB     *gorm.DB
    Router *gin.Engine
}

func main() {
    if err := godotenv.Load(); err != nil {
        log.Printf("Error loading .env file: %v", err)
    }

    app := &App{}
    app.Initialize()
    app.Run(":8080")
}

func (app *App) Initialize() {
    // Initialize database connection
    // TODO: Implement database connection

    // Initialize router
    app.Router = gin.Default()
    app.setupRoutes()
}

func (app *App) setupRoutes() {
    // Auth routes
    auth := app.Router.Group("/api/auth")
    {
        auth.POST("/register", app.Register)
        auth.POST("/login", app.Login)
    }

    // Post routes
    posts := app.Router.Group("/api/posts")
    {
        posts.GET("/", app.GetPosts)
        posts.POST("/", app.CreatePost)
        posts.GET("/:id", app.GetPost)
        posts.PUT("/:id", app.UpdatePost)
        posts.DELETE("/:id", app.DeletePost)
    }

    // Category routes
    categories := app.Router.Group("/api/categories")
    {
        categories.GET("/", app.GetCategories)
        categories.GET("/:id/posts", app.GetCategoryPosts)
    }
}

func (app *App) Run(addr string) {
    log.Fatal(app.Router.Run(addr))
}