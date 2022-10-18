package models

type Author struct {
	Id         string `bson:"_id"`
	Name       string `bson:"name"`
	WebsiteUrl string `bson:"websiteUrl"`
}
