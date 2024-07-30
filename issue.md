### Reproduction

https://github.com/HuakunShen/shadcn-vue-packaged-exp

### Describe the bug

I am trying to package some customized shadcn-vue components into a new library to share in other apps.

Here are two problems:

## Problem 1: Type Error During Build

The following 3 components have type error
1. Carousel
2. Toast
3. Auto Form

In the provided example only Carousel is included.

### Error:

```
src/components/ui/carousel/useCarousel.ts:6:8 - error TS2742: The inferred type of 'useProvideCarousel' cannot be named without a reference to '.pnpm/embla-carousel@8.1.7/node_modules/embla-carousel'. This is likely not portable. A type annotation is necessary.

6 const [useProvideCarousel, useInjectCarousel] = createInjectionState(
         ~~~~~~~~~~~~~~~~~~

src/components/ui/carousel/useCarousel.ts:47:10 - error TS2742: The inferred type of 'useCarousel' cannot be named without a reference to '.pnpm/embla-carousel@8.1.7/node_modules/embla-carousel'. This is likely not portable. A type annotation is necessary.

47 function useCarousel() {
            ~~~~~~~~~~~


Found 2 errors.
```

![image](https://github.com/user-attachments/assets/1f04c3e0-469a-42fb-b4c5-90bc919fb758)
![image](https://github.com/user-attachments/assets/da561f1f-db7b-44fe-a048-1760609d88f3)

I added some temporary types to bypass the error, not sure what the proper type should be, but I think this should be fixed.

```ts

const [useProvideCarousel, useInjectCarousel] = createInjectionState<
  // !Temp fix for types
  Array<any>,
  any
>(({ opts, orientation, plugins }: CarouselProps, emits: CarouselEmits) => {
 

// !Temp fix for types
function useCarousel(): any {
```


## Problem 2: `Definitions of the following identifiers conflict with those in another file`

The lib builds. Example in https://github.com/HuakunShen/shadcn-vue-packaged-exp `vue-lib` folder.

But in another app importing this library (example in `vue-app` folder), I keep getting error

```
> vue-tsc -b && vite build

src/App.vue:2:1 - error TS6200: Definitions of the following identifiers conflict with those in another file: __VLS_IntrinsicElements, __VLS_Element, __VLS_GlobalComponents, __VLS_IsAny, __VLS_PickNotAny, __VLS_intrinsicElements, __VLS_SelfComponent, __VLS_WithComponent, __VLS_FunctionalComponentProps, __VLS_UnionToIntersection, __VLS_OverloadUnionInner, __VLS_OverloadUnion, __VLS_ConstructorOverloads, __VLS_NormalizeEmits, __VLS_PrettifyGlobal

2 import { Button } from "vue-lib";
  ~~~~~~

  ../vue-lib/dist/components/ui/accordion/Accordion.vue.d.ts:1:1
    1 import { AccordionRootProps } from 'radix-vue';
      ~~~~~~
    Conflicts are in this file.


Found 1 error.

 ELIFECYCLE  Command failed with exit code 1.
```

Also getting the same error in IDE.

![image](https://github.com/user-attachments/assets/c42339d8-e3d3-4e38-865e-a749f049323e)

I didn't modify any code from the template and I don't think it's related to `Accordion`. If I remove Accordion from the lib, this error will still be thrown with another component.



### System Info

```bash
System:
    OS: macOS 14.6
    CPU: (10) arm64 Apple M1 Pro
    Memory: 180.31 MB / 16.00 GB
    Shell: 5.9 - /bin/zsh
  Binaries:
    Node: 22.4.1 - /opt/homebrew/bin/node
    Yarn: 1.22.22 - /usr/local/bin/yarn
    npm: 10.8.1 - /opt/homebrew/bin/npm
    pnpm: 9.6.0 - /usr/local/bin/pnpm
    bun: 1.1.21 - ~/.bun/bin/bun
  Browsers:
    Chrome: 124.0.6367.119
    Edge: 127.0.2651.74
    Safari: 17.6
  npmPackages:
    @vueuse/core: ^10.11.0 => 10.11.0 
    radix-vue: ^1.9.2 => 1.9.2
```


### Contributes

- [ ] I am willing to submit a PR to fix this issue
- [ ] I am willing to submit a PR with failing tests