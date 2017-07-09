jQuery = require 'jquery'

do fill = (item = 'A1 Auto Repair') ->
  jQuery('.tagline').append "#{item}"
fill