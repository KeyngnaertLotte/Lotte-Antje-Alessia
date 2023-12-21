import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { UsersService } from './users.service'
import { Role, User } from './entities/user.entity'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { UseGuards } from '@nestjs/common'
import { FirebaseGuard } from 'src/authentication/services/guards/firebase.guard'
import { FirebaseUser } from 'src/authentication/decoraters/user.decorator'
import { UserRecord } from 'firebase-admin/auth'
import { AllowedRoles } from './decorators/role.decorator'
import { RolesGuard } from './guards/roles.guard'
import { CreateUserAdminInput } from './dto/create-user-admin.input'

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(FirebaseGuard)
  @Mutation(() => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
    @FirebaseUser() user: UserRecord,
  ) {
    console.log('user', user)
    return this.usersService.create(createUserInput)
  }

  @UseGuards(FirebaseGuard)
  @Mutation(() => User)
  createUserAdmin(
    @Args('createUserAdminInput') createUserAdminInput: CreateUserAdminInput,
  ) {
    return this.usersService.createAdmin(createUserAdminInput)
  }

  @AllowedRoles(Role.ADMIN)
  @UseGuards(FirebaseGuard, RolesGuard)
  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll()
  }


  @UseGuards(FirebaseGuard)
  @Query(() => User, { name: 'user' })
  findOne(@Args('string', { type: () => String }) id: string) {
    return this.usersService.findOne(id)
  }

  @UseGuards(FirebaseGuard)
  @Query(() => User, { name: 'userByUid' })
  findOneByUid(@Args('string', { type: () => String }) uid: string) {
    return this.usersService.findOneByUid(uid)
  }


  @UseGuards(FirebaseGuard)
  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput)
  }

  @UseGuards(FirebaseGuard)
  @Mutation(() => User, { name: 'setLanguage' })
  setLanguage(@Args('userId') userId: string, @Args('locale') locale: string) {
    return this.usersService.setLanguage(userId, locale)
  }
}
