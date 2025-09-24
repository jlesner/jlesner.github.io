# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an academic personal website built using the Academic Pages Jekyll theme. The site is deployed via GitHub Pages at `jlesner.github.io` and serves as a portfolio for J. Lesner, a Computer Science graduate student.

## Development Commands

### Local Development
- **Start local server**: `bundle exec jekyll serve -l -H localhost` (serves at localhost:4000)
- **Install dependencies**: `bundle install`
- **Build JavaScript**: `npm run build:js`
- **Watch JavaScript**: `npm run watch:js`

### Docker Development
- **Build container**: `docker build -t jekyll-site .`
- **Run container**: `docker run -p 4000:4000 --rm -v $(pwd):/usr/src/app jekyll-site`

### Prerequisites
- Ruby (with ruby-dev, bundler)
- Node.js (for JS build tools)
- On Linux: `sudo apt install ruby-dev ruby-bundler nodejs build-essential gcc make`

## Site Architecture

### Jekyll Collections
The site uses Jekyll collections defined in `_config.yml`:

- **`_publications/`**: Academic papers and preprints (uses frontmatter for metadata)
- **`_talks/`**: Conference talks and presentations 
- **`_teaching/`**: Teaching experience and courses
- **`_portfolio/`**: Project portfolios
- **`_posts/`**: Blog posts
- **`_pages/`**: Static pages (About, CV, Resume, etc.)

### Content Generation Tools

#### Markdown Generator (`markdown_generator/`)
- **`publications.py`** / **`publications.ipynb`**: Generate publication markdown from TSV data
- **`talks.py`** / **`talks.ipynb`**: Generate talk markdown from TSV data
- **`pubsFromBib.py`**: Convert bibliography to publications
- Source TSV files: `publications.tsv`, `talks.tsv`

#### Talk Map (`talkmap/`)
- **`talkmap.py`**: Generates geographic map of talk locations using geopy/Nominatim
- Run from `_talks/` directory to scrape location data from markdown frontmatter
- Outputs interactive map to `talkmap/` directory

### Styling and Assets
- **SASS**: Located in `_sass/` (variables, mixins, components)
- **JavaScript**: Source in `assets/js/`, minified to `assets/js/main.min.js`
- **Images**: Static assets in `images/`
- **Files**: PDFs and downloads in `files/`

### Layouts and Includes
- **Layouts**: `_layouts/` (single, archive, talk, etc.)
- **Includes**: `_includes/` (reusable components, author profile, navigation)

## Key Configuration

### Site Configuration (`_config.yml`)
- Site metadata and author information
- Collection definitions and permalinks  
- Plugin configuration (jekyll-feed, jekyll-sitemap, etc.)
- Analytics and SEO settings

### Publication Categories
Defined in `_config.yml` under `publication_category`:
- `books`: Books
- `manuscripts`: Journal Articles  
- `conferences`: Conference Articles
- `preprints`: Preprint Articles
- `pilots`: Technical Reports

## Content Workflow

1. **Publications**: Add to `_publications/` or use `markdown_generator/publications.py` from TSV
2. **Talks**: Add to `_talks/` or use `markdown_generator/talks.py` from TSV
3. **Blog Posts**: Add to `_posts/` with YAML frontmatter
4. **Static Pages**: Edit files in `_pages/`
5. **Profile/Bio**: Update author section in `_config.yml`

## Important Files
- **`_config.yml`**: Main Jekyll configuration
- **`Gemfile`**: Ruby dependencies
- **`package.json`**: JavaScript build tools and dependencies
- **`index.html`**: Homepage layout (if exists)