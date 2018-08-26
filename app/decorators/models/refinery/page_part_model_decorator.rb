Refinery::PagePart.class_eval do
  def body=(value)
    super
    # This doesn't seem to work! It's simply removed from the page
    # example gist: <script src="https://gist.github.com/dcolucci/be4f1ce874806196fd88c30dfcea2d8b.js"></script>

    # This is a hack to implement gist embeds in body content.
    # We open up the PagePart class and redefine the `body` getter.
    # We replace the target embed format syntax with a script tag pointed at the gist

    # self[:body].gsub(/\[gist:(.+)\]/,"<script src='https://gist.github.com/\\1.js'></script>")

    # causes fookin' server to hang
    puts "BEFORE", self[:body]
    # self[:body].gsub(/\<img\ssrc="\/system\//, '<img src="/whoops/')
    # self.body = body.gsub(/WHAAAT/, "NOOOO")
    puts "AFTER", self[:body]

    normalise_text_fields
  end
end
