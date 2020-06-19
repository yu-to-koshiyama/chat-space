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
|username|string|null: false, unique: true|
|email|string|null: false|
|password|string|null: false|
|groups_id|integer|null: false, foreign_key: true|

### Association
- has_many :messages
- has_many :groups, through:  :users_groups

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|prime_key: true|
|body|text|null: false|
|image|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- beloungs_to :user
- beloungs_to :group

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|prime_key: true|
|group_name|string|null: false|
|users_id|string|null: false, foreign_key: true|
|message_id|integer|null: false, foreign_key: true|

### Association
- has_many :messages
- has_many :users, through:  :users_groups

## users_groupsテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|prime_key: true|
|groups_id|integer|null: false, foreign_key: true|
|users_id|integer|null: false, foreign_key: true|

### Association
- beloungs_to :user
- beloungs_to :group

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
