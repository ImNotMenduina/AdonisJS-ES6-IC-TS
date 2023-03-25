import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
//import Factory from '@ioc:Adonis/Lucid/Factory'
import { UserFactory } from 'Database/factories'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await UserFactory.with('profile').createMany(25)
  }
}
