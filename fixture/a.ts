// @ts-expect-error requires a comment
export const a: string = 1

export interface Foo {
  a: string
}

function ApiProperty() { }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class CreatePostDto {
  // @ts-expect-error xxxx
  @ApiProperty()
  title: string

  // @ts-expect-error xxxx
  @ApiProperty()
  content: string
}
