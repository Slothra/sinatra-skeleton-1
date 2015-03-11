class Contact < ActiveRecord::Base

	def self.list(contacts)
		contacts.each do |contact|
			puts contact
		end
	end
end