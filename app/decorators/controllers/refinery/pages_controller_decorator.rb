Refinery::PagesController.class_eval do
  before_action :find_all_blog_posts, :only => [:home]
  before_action :should_render_canvas?, :only => [:home]
  before_action :render_children

  def find_all_blog_posts
    @blog_posts = Refinery::Page.where(view_template: 'post', parent: nil).sort do |a,b|
      b.created_at.to_date <=> a.created_at.to_date
    end
  end

  def should_render_canvas?
    @should_render_canvas = ENV['HOMEPAGE_CANVAS'] == 'true'
  end

  def render_children
    @children = @page.children.sort do |a,b|
      b.created_at.to_date <=> a.created_at.to_date
    end

    if @page.parent_id != nil
      @parent_page = Refinery::Page.find(@page.parent_id)
    end
  end
end
