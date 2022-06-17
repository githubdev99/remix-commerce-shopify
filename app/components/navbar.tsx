import { Fragment, lazy, Suspense, useState } from "react";
import { Form, Link, PrefetchPageLinks } from "remix";
import type { To } from "react-router-dom";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import { SearchIcon, ShoppingBagIcon, XIcon } from "@heroicons/react/outline";
import type { PickTranslations } from "~/translations.server";
import type { Language } from "~/models/language";

import { CartIcon, CloseIcon, MenuIcon, WishlistIcon } from "./icons";
import { OptimizedImage } from "./optimized-image";

export type NavbarCategory = {
  name: string;
  to: To;
};

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export function Navbar({
  onOpenCart,
  onOpenWishlist,
  lang,
  logoHref,
  storeName,
  categories,
  translations,
  cartCount,
  wishlistCount,
}: {
  cartCount?: number;
  wishlistCount?: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  lang: Language;
  logoHref: string;
  storeName?: string;
  categories: NavbarCategory[];
  translations?: PickTranslations<
    | "Cart"
    | "Close Menu"
    | "Home"
    | "Open Menu"
    | "Search for products..."
    | "Wishlist"
  >;
}) {
  let [prefetchQuery, setPrefetchSeachQuery] = useState("");
  const navigation = {
    categories: [
      {
        id: "shop",
        name: "Shop",
        featured: [
          {
            name: "New Arrivals",
            href: "#",
            imageSrc:
              "https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
            imageAlt:
              "Drawstring top with elastic loop closure and textured interior padding.",
          },
          {
            name: "Artwork Tees",
            href: "#",
            imageSrc:
              "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg",
            imageAlt:
              "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
          },
        ],
        sections: [
          {
            id: "category",
            name: "Category",
            items: categories?.map((category) => {
              return {
                name: category.name,
                href: category.to,
              };
            }),
          },
        ],
      },
    ],
    pages: [{ name: "About", href: "#" }],
  };

  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white z-10">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 flex z-40">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
                <div className="px-4 pt-5 pb-2 flex">
                  <button
                    type="button"
                    className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex px-4 space-x-8">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected
                                ? "border-sky-400 text-sky-400"
                                : "border-transparent text-gray-900 hover:border-sky-400 hover:text-sky-400",
                              "text-gray-900 flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium"
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel
                        key={category.name}
                        className="pt-10 pb-8 px-4 space-y-10"
                      >
                        <div className="grid grid-cols-2 gap-x-4">
                          {category.featured.map((item) => (
                            <div
                              key={item.name}
                              className="group relative text-sm"
                            >
                              <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                                <img
                                  src={item.imageSrc}
                                  alt={item.imageAlt}
                                  className="object-center object-cover"
                                />
                              </div>
                              <a
                                href={item.href}
                                className="mt-6 block font-medium text-gray-900"
                              >
                                <span
                                  className="absolute z-10 inset-0"
                                  aria-hidden="true"
                                />
                                {item.name}
                              </a>
                              <p aria-hidden="true" className="mt-1">
                                Shop now
                              </p>
                            </div>
                          ))}
                        </div>
                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p
                              id={`${category.id}-${section.id}-heading-mobile`}
                              className="font-medium text-gray-900"
                            >
                              {section.name}
                            </p>

                            {section.items && (
                              <>
                                <ul
                                  role="list"
                                  aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                  className="mt-6 flex flex-col space-y-6"
                                >
                                  {section.items.map((item) => (
                                    <li key={item.name} className="flow-root">
                                      <Link
                                        to={item.href}
                                        className="-m-2 p-2 block text-gray-500"
                                      >
                                        {item.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </>
                            )}
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a
                        href={page.href}
                        className="-m-2 p-2 block font-medium text-gray-900"
                      >
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-zinc-600">
        <nav
          aria-label="Top"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="h-16 flex items-center">
            <button
              type="button"
              className="bg-white p-2 rounded-md text-gray-400 lg:hidden"
              onClick={() => setOpen(true)}
            >
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Logo */}
            <Link prefetch="intent" to={`/${lang}`}>
              {translations ? (
                <span className="sr-only">{translations.Home}</span>
              ) : null}
              {logoHref.endsWith(".svg") ? (
                <img
                  className="w-10 h-10"
                  src={logoHref}
                  alt=""
                  width={40}
                  height={40}
                />
              ) : (
                <OptimizedImage
                  className="w-10 h-10"
                  src={logoHref}
                  alt=""
                  width={40}
                  height={40}
                  responsive={[
                    {
                      size: {
                        width: 80,
                        height: 80,
                      },
                    },
                  ]}
                />
              )}
            </Link>
            {storeName ? <h1 className="sr-only">{storeName}</h1> : null}

            {/* Flyout menus */}
            <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
              <div className="h-full flex space-x-8">
                {navigation.categories.map((category) => (
                  <Popover key={category.name} className="flex">
                    {({ open }) => (
                      <>
                        <div className="relative flex">
                          <Popover.Button
                            className={classNames(
                              open
                                ? "border-sky-400 text-sky-400"
                                : "border-transparent text-white hover:border-sky-400 hover:text-sky-400",
                              "relative z-10 flex items-center transition-colors ease-out duration-300 text-sm font-medium border-b-2 -mb-px pt-px"
                            )}
                          >
                            {category.name}
                          </Popover.Button>
                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0"
                          enterTo="opacity-100"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Popover.Panel className="absolute top-full inset-x-0 text-sm text-gray-500">
                            {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                            <div
                              className="absolute inset-0 top-1/2 bg-white shadow"
                              aria-hidden="true"
                            />

                            <div className="relative bg-white">
                              <div className="max-w-7xl mx-auto px-8">
                                <div className="grid grid-cols-2 gap-y-10 gap-x-8 pt-16">
                                  <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                    {category.featured.map((item) => (
                                      <div
                                        key={item.name}
                                        className="group relative text-base sm:text-sm"
                                      >
                                        <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                                          <img
                                            src={item.imageSrc}
                                            alt={item.imageAlt}
                                            className="object-center object-cover"
                                          />
                                        </div>
                                        <a
                                          href={item.href}
                                          className="mt-6 block font-medium text-gray-900"
                                        >
                                          <span
                                            className="absolute z-10 inset-0"
                                            aria-hidden="true"
                                          />
                                          {item.name}
                                        </a>
                                        <p aria-hidden="true" className="mt-1">
                                          Shop now
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                                    {category.sections.map((section) => (
                                      <div key={section.name}>
                                        <p
                                          id={`${section.name}-heading`}
                                          className="font-medium text-gray-900"
                                        >
                                          {section.name}
                                        </p>
                                        {section.items && (
                                          <>
                                            <ul
                                              role="list"
                                              aria-labelledby={`${section.name}-heading`}
                                              className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                            >
                                              {section.items.map((item) => (
                                                <li
                                                  key={item.name}
                                                  className="flex"
                                                >
                                                  <a
                                                    href={item.href}
                                                    className="hover:text-gray-800"
                                                  >
                                                    {item.name}
                                                  </a>
                                                </li>
                                              ))}
                                            </ul>
                                          </>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="flex justify-center pt-5 mb-10">
                                <Link to="/en/search">
                                  <a
                                    className="bg-sky-400 p-4 text-white rounded-md hover:bg-sky-500 transition-all"
                                    onClick={() => setOpen(false)}
                                  >
                                    Shop All Here!
                                  </a>
                                </Link>
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                ))}

                {navigation.pages.map((page) => (
                  <a
                    key={page.name}
                    href={page.href}
                    className="border-transparent text-white hover:border-sky-400 hover:text-sky-400 active:border-sky-400 active:text-sky-400 relative z-10 flex items-center transition-colors ease-out duration-300 text-sm font-medium border-b-2 -mb-px pt-px"
                  >
                    {page.name}
                  </a>
                ))}
              </div>
            </Popover.Group>

            <div className="ml-auto flex items-center">
              {/* Search */}
              <div className="flex lg:ml-6">
                <a
                  href="#"
                  className="p-2 text-white hover:text-sky-400 hover:transition hover:scale-110 hover:duration-100"
                >
                  <span className="sr-only">Search</span>
                  {/* <SearchIcon className="w-6 h-6" aria-hidden="true" /> */}
                  <Form
                    data-testid="search-form"
                    action={`/${lang}/search`}
                    className="flex-1 max-w-lg mx-auto hidden lg:block"
                  >
                    <input
                      data-testid="search-input"
                      name="q"
                      className=" p-2 bg-zinc-900 border border-zinc-700 w-full"
                      placeholder={translations?.["Search for products..."]}
                      onChange={(e) => setPrefetchSeachQuery(e.target.value)}
                    />
                  </Form>
                  {prefetchQuery && (
                    <PrefetchPageLinks
                      page={`/${lang}/search?q=${prefetchQuery}`}
                    />
                  )}
                </a>
              </div>

              {/* Cart */}
              <div className="flex items-center lg:ml-3">
                <Link
                  data-testid="cart-link"
                  prefetch="intent"
                  to={`/${lang}/cart`}
                  className="group relative inline-block hover:text-gray-300 ml-4"
                  onClick={(event) => {
                    event.preventDefault();
                    onOpenCart();
                  }}
                >
                  {translations ? (
                    <span className="sr-only">{translations.Cart}</span>
                  ) : null}
                  <CartIcon className="w-8 h-8" />
                  {!!cartCount && (
                    <span
                      data-testid="cart-count"
                      style={{ lineHeight: "0.75rem" }}
                      className="absolute bottom-0 left-0 translate translate-y-[25%] translate-x-[-25%] inline-flex items-center justify-center px-[0.25rem] py-[0.125rem] text-xs text-zinc-900 bg-gray-50 group-hover:bg-gray-300 rounded-full"
                    >
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>

              {/* Wishlist */}
              <div className="flex items-center lg:ml-3">
                <Link
                  data-testid="wishlist-link"
                  prefetch="intent"
                  to={`/${lang}/wishlist`}
                  className="group relative hover:text-gray-300 ml-4"
                  onClick={(event) => {
                    event.preventDefault();
                    onOpenWishlist();
                  }}
                >
                  <span className="sr-only">
                    {translations ? translations["Wishlist"] : null}
                  </span>
                  <WishlistIcon className="w-8 h-8" />
                  {!!wishlistCount && (
                    <span
                      data-testid="wishlist-count"
                      style={{ lineHeight: "0.75rem" }}
                      className="absolute bottom-0 left-0 translate translate-y-[25%] translate-x-[-25%] inline-flex items-center justify-center px-[0.25rem] py-[0.125rem] text-xs text-zinc-900 bg-gray-50 group-hover:bg-gray-300 rounded-full"
                    >
                      {wishlistCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
