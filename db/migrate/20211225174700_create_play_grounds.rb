class CreatePlayGrounds < ActiveRecord::Migration[6.1]
  def change
    create_table :play_grounds do |t|
      t.references :room, null: false, foreign_key: true
      t.text :html_code
      t.text :css_code
      t.text :js_code

      t.timestamps
    end
  end
end
