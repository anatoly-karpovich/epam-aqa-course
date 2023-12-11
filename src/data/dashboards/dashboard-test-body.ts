import { faker } from "@faker-js/faker";


export const invalid_dashboard = [
  {
    name: "",
    description: "test description",
    testName: 'Empty name'
  },
  {
    name: faker.string.alphanumeric(129),
    description: "",
    testName: '129 characters in name'
  },
]