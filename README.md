# My Personal Site

Built on [Refinery CMS](https://github.com/refinery/refinerycms).

## Local Development

Requires:
 * PostgreSQL v10
 * Rails v5
 * Ruby v2.4

### Setup

 1. Make sure you're running the right ruby version

    ```sh
    rvm use 2.4
    ```

 1. Start the database server

    ```sh
    # indicate directory where postgres runs
    pg_ctl start -D /usr/local/var/postgres
    ```

 1. Set up the database

    ```sh
    rake db:setup
    ```

 1. Run the DB migrations

    ```sh
    rake db:migrate
    ```

### Usage

 1. Start the database server

    ```sh
    pg_ctl start -D /usr/local/var/postgres
    ```

 1. Install dependencies

    ```sh
    bundle install
    ```

 1. Start the rails app server

    ```sh
    rails server
    ```

Now the server is running on [localhost:3000](http://localhost:3000)!

Visit [localhost:3000/refinery](http://localhost:3000/refinery) to access the CMS.
