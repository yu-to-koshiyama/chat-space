# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation
# ChatSpace DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|prime_key: true|
|name|string|null: false, unique: true|
|email|string|null: false|
|password|string|null: false|

### Association
- has_many :messages
- has_many :users_groups
- has_many :groups, through:  :users_groups

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|prime_key: true|
|body|text||
|image|string||
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|prime_key: true|
|name|string|null: false|

### Association
- has_many :messages
- has_many :users_groups
- has_many :users, through:  :users_groups

## users_groupsテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|prime_key: true|
|groups|references|null: false, foreign_key: true|
|users|references|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
