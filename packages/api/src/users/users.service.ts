import { Injectable } from '@nestjs/common'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Role, User } from './entities/user.entity'
import { CreateUserAdminInput } from './dto/create-user-admin.input'
import { getAuth } from 'firebase-admin/auth'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(createUserInput: CreateUserInput) {
    // return new Error('This action adds a new user')
    const user = new User()
    user.uid = createUserInput.uid
    user.locale = createUserInput.locale ?? 'nl'
    user.role = Role.BEZOEKER
    user.naam = createUserInput.naam
    return this.userRepository.save(user)
  }

  createAdmin(createUserAdminInput: CreateUserAdminInput) {
    // return new Error('This action adds a new user')

    const tempRole: Role = createUserAdminInput.role.toLocaleUpperCase() as Role
    const user = new User()
    user.uid = createUserAdminInput.uid
    user.locale = createUserAdminInput.locale ?? 'nl'
    user.role = tempRole ?? Role.BEZOEKER
    // tempRole ??
    user.naam = createUserAdminInput.naam
    return this.userRepository.save(user)
  }

  // getUsersByRole(role: string): Promise<User[]> {
  //   return this.userRepository.find({ where: { role: role } })
  // }

  async getUsersArtiestPersoneel(): Promise<User[]> {
    // const list: User[] = []
    const artiesten = this.userRepository.find({
      where: { role: Role.ARTIEST },
    })
    const personeel = this.userRepository.find({
      where: { role: Role.PERSONEEL },
    })
    const result = await Promise.all([artiesten, personeel])

    return result[0].concat(result[1])
  }

  findAll() {
    return this.userRepository.find()
  }

  findOne(id: string) {
    return new Error(`This action returns a #${id} user`)
  }

  findOneByUid(uid: string) {
    return this.userRepository.findOneByOrFail({ uid })
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return new Error(`This action updates a #${id} user`)
  }

  async remove(uid: string) {
    const user = await this.findOneByUid(uid)

    getAuth()
      .deleteUser(uid)
      .then(() => {
        console.log('Successfully deleted user')
      })
      .catch(error => {
        console.log('Error deleting user:', error)
      })

    await this.userRepository.remove(user)
    return `user removed`
  }

  async updateNaam(uid: string, naam: string) {
    const user = await this.findOneByUid(uid)
    user.naam = naam
    return this.userRepository.save(user)
  }

  async saveAll(users: User[]): Promise<User[]> {
    return this.userRepository.save(users)
  }
  async truncate(): Promise<void> {
    await this.userRepository.clear()
  }
}
