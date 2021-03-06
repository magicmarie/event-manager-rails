# Events controller spec

require 'rails_helper'
RSpec.describe 'Events API' do
  include CurrentUser
  let!(:new_user) { create :user }
  let(:user_id) { new_user.id }
  let!(:center) { create :center }
  let(:center_id) { center.id }
  before do
    CurrentUser.user = new_user
  end

  describe 'POST api/v1/centers/:id/events' do
    let!(:params) {{ event: FactoryBot.attributes_for(:event) }}
    context 'when valid parameters are passed' do
      before do
        post "/api/v1/centers/#{center_id}/events",
             params: params,
             headers: authenticated_headers(user_id)
      end

      it 'should return a 201' do
        expect(response).to have_http_status(201)
      end

      it 'should return an event object' do
        expect(json['data']['event']).to_not be_empty
        expect(json['data']['event']['name']).to match params[:event][:name]
        expect(json['data']['event']['guests']).to match params[:event][:guests].to_i
      end

      it 'should have a center object inside the event object' do
        expect(json['data']['event']['center']).to_not be_empty
        expect(json['data']['event']['center']['name']).to match center.name
        end

      it 'should have a user object inside the event object' do
        expect(json['data']['event']['user']).to_not be_empty
        expect(json['data']['event']['user']['name']).to match new_user.name
      end
    end

    context 'when posting to an invalid center_id' do
      let(:center_id) { 10000891 }
      before do
        post "/api/v1/centers/#{center_id}/events",
             params: params,
             headers: authenticated_headers(user_id)
      end

      it 'should return a 404' do
        expect(response).to have_http_status(404)
      end
    end

    context 'when the start date overlaps with the end date for an existing event' do
      let!(:events) { create_list :event, 10, center_id: center_id }
      let(:params) do
        {
          event: FactoryBot.attributes_for(
            :event,
            center_id: center_id,
            start_time: events.first.end_time - 1.hour
          )
        }
      end
      before do
        # binding.pry
        post "/api/v1/centers/#{center_id}/events",
             params: params,
             headers: authenticated_headers(user_id)
      end

      it 'should contain a 422' do
        # binding.pry
        expect(response).to have_http_status(422)
      end

      it 'should contain an error message' do
        message = 'Start time or end time overlaps with existing time'
        expect(json['message']).to match message
      end
    end

    context 'when the start time is in the past' do
      let(:params) do
        {
          event: FactoryBot.attributes_for(
                             :event,
                             start_time: DateTime.now - 1.hour,
                             center_id: center_id
          )
        }
      end
      before do
        post "/api/v1/centers/#{center_id}/events",
             params: params,
             headers: authenticated_headers(user_id)
      end

      it 'should return a 422 error code' do
        expect(response).to have_http_status(422)
      end

      it 'should have an error message' do
        expect(json['message']).to match 'Start time is in the past'
      end
    end
  end
end