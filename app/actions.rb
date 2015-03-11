# Homepage (Root path)
get '/' do
	@contacts = Contact.all.to_json
  erb :index
end

post '/contacts' do
	contact = JSON.parse(request.body.read.to_s)
	Contact.create(contact)
end

get '/contacts/:id' do
	contact = Contact.find(params[:id])
	contact.to_json
end

post '/contacts/:id' do
	contact = Contact.find(params[:id])
	contact.update(JSON.parse(request.body.read.to_s))
end


