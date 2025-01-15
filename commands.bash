sudo apt install ruby-dev ruby-bundler nodejs
sudo apt install build-essential gcc make

git clone git@github.com:jlesner/jlesner.github.io.git
cd jlesner.github.io

mkdir -p vendor/bundle
bundle config set --local path 'vendor/bundle'
bundle install

# jekyll serve -l -H localhost -P 4000
bundle exec jekyll serve -l -H localhost -P 4000