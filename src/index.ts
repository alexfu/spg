import {Command, flags} from '@oclif/command'
import * as inquirer from 'inquirer'

class Spg extends Command {
  static description = 'Story Point Generator'

  static flags = {
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
  }

  static args = [{name: 'file'}]

  async run() {
    const familiarityQuestion = {
      type: 'list',
      name: 'familiarity',
      message: 'How familiar are you with the code surrounding this change?',
      choices: [
        {name: 'I know nothing', value: 5},
        {name: 'I know stuff, but not everything', value: 3},
        {name: 'I know everything', value: 0},
      ],
    }

    const sizeQuestion = {
      type: 'list',
      name: 'size',
      message: 'How large is the change?',
      choices: [
        {name: 'Small', value: 2},
        {name: 'Medium', value: 5},
        {name: 'Large', value: 8},
      ],
    }

    const answers = await inquirer.prompt([sizeQuestion, familiarityQuestion])

    const size = answers.size
    const familiarity = answers.familiarity

    const storyPoints = this.calculateStoryPoint(size, familiarity)

    if (storyPoints > 8) {
      this.warn(`Whoa there buddy, ${storyPoints} is alot. You may want to consider breaking this story up into multiple tickets if it makes sense.`)
    }

    this.log(`Your story points: ${storyPoints}`)
  }

  calculateStoryPoint(size: number, familiarity: number): number {
    return size + familiarity
  }
}

export = Spg
