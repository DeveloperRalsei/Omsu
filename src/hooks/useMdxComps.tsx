import {Anchor, TitleProps} from '@mantine/core'

export function useMdxComps() {
   const components = {
      a: (props: any) => <Anchor {...props} />,
   }

   return components
}
