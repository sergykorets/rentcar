hotels = Hotel.all
SitemapGenerator::Sitemap.default_host = "http://www.dragobrat.net"
SitemapGenerator::Sitemap.sitemaps_path = 'shared/'
SitemapGenerator::Sitemap.compress = false
SitemapGenerator::Sitemap.create do
  add '/', :changefreq => 'weekly', :priority => 0.9
  hotels.find_each do |hotel|
    add hotel_path(hotel.slug), changefreq: 'daily', priority: 0.8, lastmod: hotel.updated_at
  end
end