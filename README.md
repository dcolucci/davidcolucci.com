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
    $ rvm use 2.4
    ```

 1. Start the database server

    ```sh
    # indicate directory where postgres runs
    $ pg_ctl start -D /usr/local/var/postgres
    ```
    If the DB server runs from the above directory, you can use this rake task to start it:

    ```sh
    $ rake startdb
    ```

1. Create the `davidcoluccicom` role on the database server

    ```
    # don't forget the semicolon ;)
    postgres=# CREATE ROLE davidcoluccicom LOGIN CREATEDB;
    ```

 1. Set up the database

    ```sh
    $ rake db:setup
    ```

 1. Run the DB migrations

    ```sh
    $ rake db:migrate
    ```

### Usage

 1. Start the database server using the rake task...

    ```sh
    $ rake startdb
    ```
    ...Or direct postgres command
    ```sh
    $ pg_ctl start -D /path/to/my/dbserver
    ```
    Later, the DB server can be stopped:
    ```sh
    $ rake stopdb
    # or
    $ pg_ctl stop -D /path/to/my/dbserver
    ```

 1. Install dependencies

    ```sh
    $ bundle install
    ```

 1. Start the rails app server

    ```sh
    $ rails server
    ```

Now the server is running on [localhost:3000](http://localhost:3000)!

Visit [localhost:3000/refinery](http://localhost:3000/refinery) to access the CMS.

### Maintenance

To keep gems up to date (especially if security vulnerabilities are reported, etc), update `Gemfile.lock`:
```sh
$ bundle update
```

#### Rails / Ruby hanging

Occasionally a process will hang and needs to be killed. Particularly if messages like these start appearing in the rails server logs:

```
app/decorators/models/refinery/page_part_model_decorator.rb:15:in `body='
app/decorators/models/refinery/page_part_model_decorator.rb:15:in `body='
app/decorators/models/refinery/page_part_model_decorator.rb:15:in `body='
app/decorators/models/refinery/page_part_model_decorator.rb:15:in `body='
app/decorators/models/refinery/page_part_model_decorator.rb:15:in `body='
app/decorators/models/refinery/page_part_model_decorator.rb:15:in `body='
app/decorators/models/refinery/page_part_model_decorator.rb:15:in `body='
app/decorators/models/refinery/page_part_model_decorator.rb:15:in `body='
```

List the processes running:
```sh
$ ps
```

The output will look something like:
```
PID TTY           TIME CMD
 385 ttys000    0:00.02 /Applications/iTerm.app/Contents/MacOS/iTerm2 --server /usr/bi
 387 ttys000    0:00.28 -zsh
1488 ttys000    0:00.03 /usr/local/Cellar/postgresql/10.1/bin/postgres -D /usr/local/v
1107 ttys001    0:00.02 /Applications/iTerm.app/Contents/MacOS/iTerm2 --server /usr/bi
1112 ttys001    0:00.21 -zsh
1520 ttys001    1:06.89 puma 3.11.0 (tcp://0.0.0.0:3000) [davidcolucci.com]
1522 ttys001    0:00.01 /Users/David/.rvm/gems/ruby-2.4.1/gems/rb-fsevent-0.10.3/bin/f
1523 ttys001    0:00.01 /Users/David/.rvm/gems/ruby-2.4.1/gems/rb-fsevent-0.10.3/bin/f
1524 ttys001    0:00.01 /Users/David/.rvm/gems/ruby-2.4.1/gems/rb-fsevent-0.10.3/bin/f
1525 ttys001    0:00.01 /Users/David/.rvm/gems/ruby-2.4.1/gems/rb-fsevent-0.10.3/bin/f
1526 ttys001    0:00.01 /Users/David/.rvm/gems/ruby-2.4.1/gems/rb-fsevent-0.10.3/bin/f
1527 ttys001    0:00.01 /Users/David/.rvm/gems/ruby-2.4.1/gems/rb-fsevent-0.10.3/bin/f
1528 ttys001    0:00.01 /Users/David/.rvm/gems/ruby-2.4.1/gems/rb-fsevent-0.10.3/bin/f
```

We want to kill the `puma` process (that's the HTTP server rails uses under the hood).
```sh
$ kill -9 1520
```

## To Do
 - [ ] check back in on RefineryCMS Rails 6 compatibility