// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $_middleware from "./routes/_middleware.ts";
import * as $api_middleware from "./routes/api/_middleware.ts";
import * as $api_bookmarks_find_index from "./routes/api/bookmarks/find/index.ts";
import * as $api_bookmarks_index from "./routes/api/bookmarks/index.ts";
import * as $api_collections_id_index from "./routes/api/collections/[_id]/index.ts";
import * as $api_collections_index from "./routes/api/collections/index.ts";
import * as $api_dictionary_id_definition_definitionId_index from "./routes/api/dictionary/[_id]/definition/[definitionId]/index.ts";
import * as $api_dictionary_id_definition_index from "./routes/api/dictionary/[_id]/definition/index.ts";
import * as $api_dictionary_id_examples_index from "./routes/api/dictionary/[_id]/examples/index.ts";
import * as $api_dictionary_search_query_ from "./routes/api/dictionary/search/[query].ts";
import * as $api_old_bookmarks_index from "./routes/api/old_bookmarks/index.ts";
import * as $api_openai_example_index from "./routes/api/openai/example/index.ts";
import * as $auth_delete from "./routes/auth/delete.ts";
import * as $auth_email from "./routes/auth/email.ts";
import * as $auth_signin from "./routes/auth/signin.ts";
import * as $auth_signup from "./routes/auth/signup.ts";
import * as $bookmarks_index from "./routes/bookmarks/index.tsx";
import * as $collection_id_ from "./routes/collection/[_id].tsx";
import * as $dictionary_id_ from "./routes/dictionary/[_id].tsx";
import * as $index from "./routes/index.tsx";
import * as $practice_index from "./routes/practice/index.tsx";
import * as $profile_index from "./routes/profile/index.tsx";
import * as $signin_index from "./routes/signin/index.tsx";
import * as $signout_index from "./routes/signout/index.ts";
import * as $signup_index from "./routes/signup/index.tsx";
import * as $Header from "./islands/Header.tsx";
import * as $NavbarSearch from "./islands/NavbarSearch.tsx";
import * as $NavigationMenu from "./islands/NavigationMenu.tsx";
import * as $TTS from "./islands/TTS.tsx";
import * as $auth_DeleteAccountForm from "./islands/auth/DeleteAccountForm.tsx";
import * as $auth_SignInForm from "./islands/auth/SignInForm.tsx";
import * as $auth_SignUpForm from "./islands/auth/SignUpForm.tsx";
import * as $bookmarks_BookmarkList from "./islands/bookmarks/BookmarkList.tsx";
import * as $bookmarks_Collections from "./islands/bookmarks/Collections.tsx";
import * as $collection_CollectionItem from "./islands/collection/CollectionItem.tsx";
import * as $collection_CollectionModal from "./islands/collection/CollectionModal.tsx";
import * as $dictionary_AddDefinition from "./islands/dictionary/AddDefinition.tsx";
import * as $dictionary_DictionaryDefinition from "./islands/dictionary/DictionaryDefinition.tsx";
import * as $dictionary_DictionaryDefinitions from "./islands/dictionary/DictionaryDefinitions.tsx";
import * as $dictionary_DictionaryWord from "./islands/dictionary/DictionaryWord.tsx";
import * as $dictionary_GenerateExample from "./islands/dictionary/GenerateExample.tsx";
import * as $notifications_Toast from "./islands/notifications/Toast.tsx";
import * as $notifications_ToastContainer from "./islands/notifications/ToastContainer.tsx";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/_middleware.ts": $_middleware,
    "./routes/api/_middleware.ts": $api_middleware,
    "./routes/api/bookmarks/find/index.ts": $api_bookmarks_find_index,
    "./routes/api/bookmarks/index.ts": $api_bookmarks_index,
    "./routes/api/collections/[_id]/index.ts": $api_collections_id_index,
    "./routes/api/collections/index.ts": $api_collections_index,
    "./routes/api/dictionary/[_id]/definition/[definitionId]/index.ts":
      $api_dictionary_id_definition_definitionId_index,
    "./routes/api/dictionary/[_id]/definition/index.ts":
      $api_dictionary_id_definition_index,
    "./routes/api/dictionary/[_id]/examples/index.ts":
      $api_dictionary_id_examples_index,
    "./routes/api/dictionary/search/[query].ts": $api_dictionary_search_query_,
    "./routes/api/old_bookmarks/index.ts": $api_old_bookmarks_index,
    "./routes/api/openai/example/index.ts": $api_openai_example_index,
    "./routes/auth/delete.ts": $auth_delete,
    "./routes/auth/email.ts": $auth_email,
    "./routes/auth/signin.ts": $auth_signin,
    "./routes/auth/signup.ts": $auth_signup,
    "./routes/bookmarks/index.tsx": $bookmarks_index,
    "./routes/collection/[_id].tsx": $collection_id_,
    "./routes/dictionary/[_id].tsx": $dictionary_id_,
    "./routes/index.tsx": $index,
    "./routes/practice/index.tsx": $practice_index,
    "./routes/profile/index.tsx": $profile_index,
    "./routes/signin/index.tsx": $signin_index,
    "./routes/signout/index.ts": $signout_index,
    "./routes/signup/index.tsx": $signup_index,
  },
  islands: {
    "./islands/Header.tsx": $Header,
    "./islands/NavbarSearch.tsx": $NavbarSearch,
    "./islands/NavigationMenu.tsx": $NavigationMenu,
    "./islands/TTS.tsx": $TTS,
    "./islands/auth/DeleteAccountForm.tsx": $auth_DeleteAccountForm,
    "./islands/auth/SignInForm.tsx": $auth_SignInForm,
    "./islands/auth/SignUpForm.tsx": $auth_SignUpForm,
    "./islands/bookmarks/BookmarkList.tsx": $bookmarks_BookmarkList,
    "./islands/bookmarks/Collections.tsx": $bookmarks_Collections,
    "./islands/collection/CollectionItem.tsx": $collection_CollectionItem,
    "./islands/collection/CollectionModal.tsx": $collection_CollectionModal,
    "./islands/dictionary/AddDefinition.tsx": $dictionary_AddDefinition,
    "./islands/dictionary/DictionaryDefinition.tsx":
      $dictionary_DictionaryDefinition,
    "./islands/dictionary/DictionaryDefinitions.tsx":
      $dictionary_DictionaryDefinitions,
    "./islands/dictionary/DictionaryWord.tsx": $dictionary_DictionaryWord,
    "./islands/dictionary/GenerateExample.tsx": $dictionary_GenerateExample,
    "./islands/notifications/Toast.tsx": $notifications_Toast,
    "./islands/notifications/ToastContainer.tsx": $notifications_ToastContainer,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
