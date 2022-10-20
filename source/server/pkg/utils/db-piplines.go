package utils

import "go.mongodb.org/mongo-driver/bson"

var UserLookup = bson.D{{Key: "$lookup", Value: bson.D{{Key: "from", Value: "users"}, {Key: "localField", Value: "userId"}, {Key: "foreignField", Value: "_id"}, {Key: "as", Value: "user"}}}}
var UserUnset = bson.D{{Key: "$unset", Value: bson.A{"user.password"}}} // bson array bson.A