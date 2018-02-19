Refinery::PagesController.class_eval do
  before_action :find_all_blog_posts, :only => [:home]

  def find_all_blog_posts
    @blog_posts = Refinery::Page.where(view_template: 'post').sort do |a,b|
      b.updated_at.to_date <=> a.updated_at.to_date
    end
  end
end
