require "rails_helper"

RSpec.describe GroupAdminsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/group_admins").to route_to("group_admins#index")
    end

    it "routes to #show" do
      expect(get: "/group_admins/1").to route_to("group_admins#show", id: "1")
    end


    it "routes to #create" do
      expect(post: "/group_admins").to route_to("group_admins#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/group_admins/1").to route_to("group_admins#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/group_admins/1").to route_to("group_admins#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/group_admins/1").to route_to("group_admins#destroy", id: "1")
    end
  end
end
