sudo apt install ruby-dev ruby-bundler nodejs
sudo apt install build-essential gcc make

git clone git@github.com:jlesner/jlesner.github.io.git
cd jlesner.github.io

mkdir -p vendor/bundle
bundle config set --local path 'vendor/bundle'
bundle install

# jekyll serve -l -H localhost -P 4000
bundle exec jekyll serve -l -H localhost -P 4000


apt install libimage-exiftool-perl
exiftool -Title="" -Author="" -Producer="" "`wslpath -u 'C:\Users\chris\OneDrive\jlesner\resume\jlesner_cv_2025_0010.pdf'`"

