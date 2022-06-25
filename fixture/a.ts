// @ts-expect-error requires a comment
export const a: string = 1

export interface Foo {
  a: string
}

function ApiProperty() { }

class CreatePostDto {
  // @ts-ignore
  @ApiProperty()
  title: string

  // @ts-ignore
  @ApiProperty()
  content: string
}