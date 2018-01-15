Refinery::PagesController.class_eval do
  before_action :find_all_blog_posts, :only => [:home]

  def find_all_blog_posts
    @blog_posts = Refinery::Page.where(view_template: 'post')
  end
end
