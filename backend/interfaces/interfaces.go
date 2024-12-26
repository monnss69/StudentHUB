package interfaces

import (
	"time"

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
