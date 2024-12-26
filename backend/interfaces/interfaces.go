package interfaces

import (
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type User struct {
	ID           uuid.UUID `gorm:"type:uuid;primary_key;default:gen_random_uuid()"`
	Username     string    `gorm:"type:varchar(50);unique;not null"`
	Email        string    `gorm:"type:varchar(255);unique;not null"`
	PasswordHash string    `gorm:"column:password_hash;type:varchar(255);not null"`
	CreatedAt    time.Time `gorm:"type:timestamp with time zone;default:current_timestamp"`
	UpdatedAt    time.Time `gorm:"type:timestamp with time zone;default:current_timestamp"`
}

type Category struct {
	ID          uuid.UUID `gorm:"type:uuid;primary_key;default:gen_random_uuid()"`
	Name        string    `gorm:"type:varchar(100);unique;not null"`
	Description string    `gorm:"type:text"`
	CreatedAt   time.Time `gorm:"type:timestamp with time zone;default:current_timestamp"`
}

type Post struct {
	ID         uuid.UUID `gorm:"type:uuid;primary_key;default:gen_random_uuid()"`
	Title      string    `gorm:"type:varchar(255);not null"`
	Content    string    `gorm:"type:text;not null"`
	AuthorID   uuid.UUID `gorm:"column:author_id;type:uuid;not null;references:users(id)"`
	CategoryID uuid.UUID `gorm:"column:category_id;type:uuid;not null;references:categories(id)"`
	CreatedAt  time.Time `gorm:"type:timestamp with time zone;default:current_timestamp"`
	UpdatedAt  time.Time `gorm:"type:timestamp with time zone;default:current_timestamp"`
}

type Tag struct {
	ID        uuid.UUID `gorm:"type:uuid;primary_key;default:gen_random_uuid()"`
	Name      string    `gorm:"type:varchar(50);unique;not null"`
	CreatedAt time.Time `gorm:"type:timestamp with time zone;default:current_timestamp"`
}

type PostTag struct {
	PostID uuid.UUID `gorm:"column:post_id;type:uuid;primary_key;references:posts(id)"`
	TagID  uuid.UUID `gorm:"column:tag_id;type:uuid;primary_key;references:tags(id)"`
}

type Comment struct {
	ID        uuid.UUID `gorm:"type:uuid;primary_key;default:gen_random_uuid()"`
	Content   string    `gorm:"type:text;not null"`
	PostID    uuid.UUID `gorm:"column:post_id;type:uuid;not null;references:posts(id)"`
	AuthorID  uuid.UUID `gorm:"column:author_id;type:uuid;not null;references:users(id)"`
	CreatedAt time.Time `gorm:"type:timestamp with time zone;default:current_timestamp"`
	UpdatedAt time.Time `gorm:"type:timestamp with time zone;default:current_timestamp"`
}

// Repository Interfaces
type UserRepository interface {
	Create(user *User) error
	GetByID(id uuid.UUID) (*User, error)
	GetByEmail(email string) (*User, error)
	GetByUsername(username string) (*User, error)
	Update(user *User) error
	Delete(id uuid.UUID) error
}

type CategoryRepository interface {
	Create(category *Category) error
	GetByID(id uuid.UUID) (*Category, error)
	List() ([]Category, error)
	Update(category *Category) error
	Delete(id uuid.UUID) error
}

type PostRepository interface {
	Create(post *Post) error
	GetByID(id uuid.UUID) (*Post, error)
	ListByCategory(categoryID uuid.UUID) ([]Post, error)
	ListByAuthor(authorID uuid.UUID) ([]Post, error)
	ListByTag(tagID uuid.UUID) ([]Post, error)
	Update(post *Post) error
	Delete(id uuid.UUID) error
}

type TagRepository interface {
	Create(tag *Tag) error
	GetByID(id uuid.UUID) (*Tag, error)
	List() ([]Tag, error)
	AddToPost(postID, tagID uuid.UUID) error
	RemoveFromPost(postID, tagID uuid.UUID) error
}

type CommentRepository interface {
	Create(comment *Comment) error
	GetByID(id uuid.UUID) (*Comment, error)
	ListByPost(postID uuid.UUID) ([]Comment, error)
	Update(comment *Comment) error
	Delete(id uuid.UUID) error
}

// Service Interfaces
type UserService interface {
	Register(username, email, password string) error
	Login(email, password string) (string, error) // Returns JWT token
	GetProfile(id uuid.UUID) (*User, error)
	UpdateProfile(id uuid.UUID, user *User) error
}

type PostService interface {
	CreatePost(title, content string, authorID, categoryID uuid.UUID, tags []uuid.UUID) error
	GetPost(id uuid.UUID) (*Post, error)
	ListPosts(filters map[string]interface{}) ([]Post, error)
	UpdatePost(id uuid.UUID, post *Post) error
	DeletePost(id uuid.UUID) error
}

type CommentService interface {
	CreateComment(content string, postID, authorID uuid.UUID) error
	GetComment(id uuid.UUID) (*Comment, error)
	ListPostComments(postID uuid.UUID) ([]Comment, error)
	UpdateComment(id uuid.UUID, content string) error
	DeleteComment(id uuid.UUID) error
}

// Handler Interfaces (for HTTP handlers)
type UserHandler interface {
	Register(c *gin.Context)
	Login(c *gin.Context)
	GetProfile(c *gin.Context)
	UpdateProfile(c *gin.Context)
}

type PostHandler interface {
	Create(c *gin.Context)
	Get(c *gin.Context)
	List(c *gin.Context)
	Update(c *gin.Context)
	Delete(c *gin.Context)
}

type CommentHandler interface {
	Create(c *gin.Context)
	Get(c *gin.Context)
	ListForPost(c *gin.Context)
	Update(c *gin.Context)
	Delete(c *gin.Context)
}
