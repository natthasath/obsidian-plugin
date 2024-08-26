"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};
var _name, _type, _Created, _Modified, _getMetadataTypeManager, _loadRegisteredProperties, loadRegisteredProperties_fn, _files, _metadata, _filter, _query, _tFile, _metadata2, _value, _getCachedValue, getCachedValue_fn, _calculateValue, calculateValue_fn, _displayText;
const obsidian = require("obsidian");
function getMetadataTypeManager(app) {
  const metadataTypeManager = "metadataTypeManager" in app ? app.metadataTypeManager : void 0;
  if (!metadataTypeManager) {
    console.warn(
      `[Timeline View] Could not find metadataTypeManager in app`
    );
    return void 0;
  }
  if (typeof metadataTypeManager !== "object") {
    console.warn(
      `[Timeline View] MetadataTypeManager is not an object in app`
    );
    return void 0;
  }
  if (!validMetadataTypeManager(metadataTypeManager)) {
    console.warn(
      `[Timeline View] MetadataTypeManager is not of expected shape in app`
    );
    return void 0;
  }
  return metadataTypeManager;
}
function validMetadataTypeManager(metadataTypeManager) {
  if (!("properties" in metadataTypeManager) || !metadataTypeManager.properties) {
    console.warn(
      `[Timeline View] MetadataTypeManager does not have properties`
    );
    return false;
  }
  if (typeof metadataTypeManager.properties !== "object") {
    console.warn(
      `[Timeline View] MetadataTypeManager.properties is not an object`
    );
    return false;
  }
  if (!validMetadataTypeProperties(metadataTypeManager.properties)) {
    console.warn(
      `[Timeline View] MetadataTypeManager.properties is not of expected shape`
    );
    return false;
  }
  if (!("types" in metadataTypeManager) || !metadataTypeManager.types) {
    console.warn(`[Timeline View] MetadataTypeManager does not have types`);
    return false;
  }
  if (typeof metadataTypeManager.types !== "object") {
    console.warn(
      `[Timeline View] MetadataTypeManager.types is not an object`
    );
    return false;
  }
  if (!validMetadataTypeTypes(metadataTypeManager.types)) {
    console.warn(
      `[Timeline View] MetadataTypeManager.types is not of expected shape`
    );
    return false;
  }
  return true;
}
function validMetadataTypeProperties(properties) {
  if (!("aliases" in properties) || properties.aliases === null) {
    console.warn(`[Timeline View] MetadataTypeManager.properties.aliases is null or undefined`);
    return false;
  }
  if (!validProperty("aliases", properties.aliases)) {
    console.warn(`[Timeline View] MetadataTypeManager.properties.aliases is not of expected shape`);
    return false;
  }
  properties.aliases;
  if (!("cssclasses" in properties) || properties.cssclasses === null) {
    console.warn(`[Timeline View] MetadataTypeManager.properties.cssclasses is null or undefined`);
    return false;
  }
  if (!validProperty("cssclasses", properties.cssclasses)) {
    console.warn(`[Timeline View] MetadataTypeManager.properties.cssclasses is not of expected shape`);
    return false;
  }
  properties.cssclasses;
  if (!("tags" in properties) || properties.tags === null) {
    console.warn(`[Timeline View] MetadataTypeManager.properties.tags is null or undefined`);
    return false;
  }
  if (!validProperty("tags", properties.tags)) {
    console.warn(`[Timeline View] MetadataTypeManager.properties.tags is not of expected shape`);
    return false;
  }
  properties.tags;
  for (const [key, value] of Object.entries(properties)) {
    if (!validProperty(key, value)) {
      return false;
    }
  }
  return true;
}
function validProperty(name, property) {
  if (typeof property !== "object" || property === null) {
    return false;
  }
  if (!("name" in property) || !("type" in property) || !("count" in property)) {
    return false;
  }
  if (typeof property.name !== "string") {
    return false;
  }
  if (typeof property.type !== "string") {
    return false;
  }
  if (typeof property.count !== "number") {
    return false;
  }
  return true;
}
function validMetadataTypeTypes(types) {
  if (!("aliases" in types) || !("cssclasses" in types) || !("tags" in types)) {
    return false;
  }
  if (!validPropertyType("aliases", types.aliases) && !validPropertyType("cssclasses", types.cssclasses) && !validPropertyType("tags", types.tags)) {
    return false;
  }
  for (const [key, value] of Object.entries(types)) {
    if (!validPropertyType(key, value)) {
      return false;
    }
  }
  return true;
}
function validPropertyType(name, type) {
  if (typeof type !== "object" || type === null) {
    return false;
  }
  if (!("name" in type) || !("type" in type)) {
    return false;
  }
  if (typeof type.name !== "string") {
    return false;
  }
  if (typeof type.type !== "string") {
    return false;
  }
  return true;
}
const _NoteProperty = class _NoteProperty {
  constructor(name, type) {
    __privateAdd(this, _name, void 0);
    __privateAdd(this, _type, void 0);
    __privateSet(this, _name, name);
    __privateSet(this, _type, type);
  }
  name() {
    return __privateGet(this, _name);
  }
  type() {
    return __privateGet(this, _type);
  }
  selectFrom(note) {
    return note.properties()[__privateGet(this, _name)];
  }
  static get Created() {
    if (!__privateGet(this, _Created)) {
      __privateSet(this, _Created, new _NoteProperty("created", "datetime"));
      __privateGet(this, _Created).selectFrom = (note) => note.created();
    }
    return __privateGet(this, _Created);
  }
  static get Modified() {
    if (!__privateGet(this, _Modified)) {
      __privateSet(this, _Modified, new _NoteProperty("modified", "datetime"));
      __privateGet(this, _Modified).selectFrom = (note) => note.modified();
    }
    return __privateGet(this, _Modified);
  }
};
_name = new WeakMap();
_type = new WeakMap();
_Created = new WeakMap();
_Modified = new WeakMap();
__privateAdd(_NoteProperty, _Created, null);
__privateAdd(_NoteProperty, _Modified, null);
let NoteProperty = _NoteProperty;
const REGISTERED_PROPERTY_JSON_PATH = obsidian.normalizePath(`.obsidian/types.json`);
class ObsidianNotePropertyRepository {
  constructor(fs, getMetadataTypeManager2) {
    __privateAdd(this, _loadRegisteredProperties);
    __privateAdd(this, _getMetadataTypeManager, void 0);
    this.fs = fs;
    __privateSet(this, _getMetadataTypeManager, () => {
      const metadataTypeManager = getMetadataTypeManager2();
      if (metadataTypeManager)
        __privateSet(this, _getMetadataTypeManager, () => metadataTypeManager);
      return metadataTypeManager;
    });
  }
  async getPropertyByName(name) {
    var _a;
    if (name === NoteProperty.Created.name())
      return NoteProperty.Created;
    if (name === NoteProperty.Modified.name())
      return NoteProperty.Modified;
    const registeredProperties = await __privateMethod(this, _loadRegisteredProperties, loadRegisteredProperties_fn).call(this);
    return (_a = registeredProperties.find((it) => it.name() === name)) != null ? _a : null;
  }
  async listPropertiesOfTypes(types) {
    var _a;
    const unregisteredProperties = (_a = __privateGet(this, _getMetadataTypeManager).call(this)) == null ? void 0 : _a.properties;
    if (unregisteredProperties) {
      const properties = [];
      if (types.includes(NoteProperty.Created.type())) {
        properties.push(NoteProperty.Created);
      }
      if (types.includes(NoteProperty.Modified.type())) {
        properties.push(NoteProperty.Modified);
      }
      for (const property of Object.values(unregisteredProperties)) {
        if (types.includes(property.type)) {
          properties.push(
            new NoteProperty(property.name, property.type)
          );
        }
      }
      return properties;
    } else {
      const properties = (await __privateMethod(this, _loadRegisteredProperties, loadRegisteredProperties_fn).call(this)).filter(
        (property) => types.includes(property.type())
      );
      return properties;
    }
  }
}
_getMetadataTypeManager = new WeakMap();
_loadRegisteredProperties = new WeakSet();
loadRegisteredProperties_fn = async function() {
  let json = {};
  try {
    const rawText = await this.fs.read(REGISTERED_PROPERTY_JSON_PATH);
    json = JSON.parse(rawText);
  } catch (err) {
    console.error("[Timline View]", err);
  }
  const registeredProperties = [
    NoteProperty.Created,
    NoteProperty.Modified
  ];
  if (!("types" in json)) {
    return registeredProperties;
  }
  const types = json.types;
  if (types == null || typeof types !== "object") {
    return registeredProperties;
  }
  for (const [propertyName, maybePropertyType] of Object.entries(types)) {
    if (typeof maybePropertyType === "string") {
      registeredProperties.push(
        new NoteProperty(propertyName, maybePropertyType)
      );
    }
  }
  return registeredProperties;
};
function isFileFilter(obj) {
  return obj != null && typeof obj === "object" && "appliesTo" in obj && typeof obj.appliesTo === "function";
}
function or(a, b) {
  a = Array.isArray(a) ? matchAll(a) : a;
  b = Array.isArray(b) ? matchAll(b) : b;
  return new OrFilter(a, b);
}
class OrFilter {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
  async appliesTo(file) {
    return await this.a.appliesTo(file) || await this.b.appliesTo(file);
  }
  and(filter) {
    return matchAll(this, filter);
  }
  or(filter) {
    return or(this, filter);
  }
}
function matchAll(...filters) {
  if (filters.length === 1) {
    if (Array.isArray(filters[0])) {
      return combine$1(filters[0]);
    }
  }
  return combine$1(filters);
}
function combine$1(filters) {
  if (filters.length === 1)
    return filters[0];
  if (filters.length === 0)
    return MatchNone;
  return MatchAllFilter.flattened(filters);
}
const MatchNone = {
  async appliesTo(file) {
    return false;
  },
  and(filter) {
    return this;
  },
  or(filter) {
    return filter;
  }
};
class MatchAllFilter {
  constructor(filters) {
    this.filters = filters;
  }
  static flattened(filters) {
    if (!filters.some((filter) => filter instanceof MatchAllFilter)) {
      return new MatchAllFilter(filters);
    }
    return new MatchAllFilter(
      filters.flatMap((filter) => {
        if (filter instanceof MatchAllFilter) {
          return filter.filters;
        }
        return [filter];
      })
    );
  }
  async appliesTo(file) {
    return Promise.all(
      this.filters.map((filter) => filter.appliesTo(file))
    ).then((all) => all.every((it) => it));
  }
  and(filter) {
    if (filter instanceof MatchAllFilter) {
      return new MatchAllFilter(this.filters.concat(filter.filters));
    }
    return new MatchAllFilter(
      this.filters.concat(filter)
    );
  }
  or(filter) {
    return or(this, filter);
  }
}
class FileContentFilter {
  constructor(checker) {
    this.checker = checker;
  }
  async appliesTo(file) {
    const content2 = await file.vault.cachedRead(file);
    return this.checker.matches(content2);
  }
  and(filter) {
    return matchAll(this, filter);
  }
  or(filter) {
    return or(this, filter);
  }
}
function isParentParser(parser) {
  return "containsNestedGroupParser" in parser && typeof parser.containsNestedGroupParser === "function";
}
function isStringChecker(obj) {
  return obj != null && typeof obj === "object" && "matches" in obj && typeof obj.matches === "function";
}
class FileNameFilter {
  constructor(checker) {
    this.checker = checker;
  }
  async appliesTo(file2) {
    return this.checker.matches(file2.basename);
  }
  and(filter) {
    return matchAll(this, filter);
  }
  or(filter) {
    return or(this, filter);
  }
}
class FilePathFilter {
  constructor(checker) {
    this.checker = checker;
  }
  async appliesTo(file) {
    return this.checker.matches(file.path);
  }
  and(filter) {
    return matchAll(this, filter);
  }
  or(filter) {
    return matchAll(this, filter);
  }
}
class Or {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
  matches(test) {
    return this.a.matches(test) || this.b.matches(test);
  }
  or(checker) {
    return new Or(this, checker);
  }
  and(checker) {
    return group(this, checker);
  }
}
function group(...checkers) {
  if (checkers.length === 1) {
    if (Array.isArray(checkers[0])) {
      return combine(checkers[0]);
    }
  }
  return combine(checkers);
}
function combine(checkers) {
  if (checkers.length === 1)
    return checkers[0];
  return new Group(checkers);
}
class Group {
  constructor(checkers) {
    this.checkers = checkers;
  }
  matches(test) {
    return this.checkers.every((checker) => checker.matches(test));
  }
  or(checker) {
    return new Or(this, checker);
  }
  and(checker) {
    return group(this.checkers.concat([checker]));
  }
}
class Phrase {
  constructor(phrase2, matchCase = true) {
    this.phrase = phrase2;
    this.matchCase = matchCase;
  }
  matches(test) {
    if (this.matchCase)
      return test.includes(this.phrase);
    return test.toLocaleUpperCase().includes(this.phrase.toLocaleUpperCase());
  }
  or(checker) {
    return new Or(this, checker);
  }
  and(checker) {
    return group(this, checker);
  }
}
class SubQueryPhraseParser {
  constructor(matchCase = true, buffer = "") {
    this.matchCase = matchCase;
    this.buffer = buffer;
  }
  parse(char) {
    switch (char) {
      case `\\`: {
        return new EscapedSubQueryPhraseParser(this.buffer, this.matchCase);
      }
      case `"`: {
        return null;
      }
    }
    return new SubQueryPhraseParser(this.matchCase, this.buffer + char);
  }
  end() {
    if (this.buffer.length > 0) {
      return new Phrase(this.buffer, this.matchCase);
    }
  }
}
class EscapedSubQueryPhraseParser extends SubQueryPhraseParser {
  constructor(buffer, matchCase = true) {
    super(matchCase, buffer);
  }
  parse(char) {
    return new SubQueryPhraseParser(
      this.matchCase,
      this.buffer + char
    );
  }
}
function not(checker) {
  if (checker instanceof Not) {
    return checker.not();
  }
  return new Not(checker);
}
class Not {
  constructor(checker) {
    this.checker = checker;
  }
  matches(test) {
    return !this.checker.matches(test);
  }
  not() {
    return this.checker;
  }
  or(checker) {
    return new Or(this, checker);
  }
  and(checker) {
    return group(this, checker);
  }
}
const Word = Phrase;
class SubQueryWordParser {
  constructor(buffer, matchCase) {
    this.buffer = buffer;
    this.matchCase = matchCase;
  }
  parse(char) {
    if (char === ` `) {
      return null;
    }
    return new SubQueryWordParser(
      this.buffer + char,
      this.matchCase
    );
  }
  end() {
    if (this.buffer.length > 0) {
      return new Word(this.buffer, this.matchCase);
    }
  }
}
class SubQueryEitherParser {
  constructor(aChecker, bChecker, matchCase, internalParser = new DefaultSubQueryParser(matchCase)) {
    this.aChecker = aChecker;
    this.bChecker = bChecker;
    this.matchCase = matchCase;
    this.internalParser = internalParser;
  }
  static start(aChecker, matchCase = true) {
    return new SubQueryEitherParser(
      aChecker,
      group(),
      matchCase
    );
  }
  parse(char) {
    const nextParser = this.internalParser.parse(char);
    if (nextParser == null) {
      return new SubQueryEitherParser(
        this.aChecker,
        this.nextChecker(),
        this.matchCase,
        new DefaultSubQueryParser(this.matchCase)
      );
    }
    return new SubQueryEitherParser(
      this.aChecker,
      this.bChecker,
      this.matchCase,
      nextParser
    );
  }
  nextChecker() {
    const next = this.internalParser.end();
    if (next != null) {
      return this.bChecker.and(next);
    }
    return this.bChecker;
  }
  end() {
    return this.aChecker.or(this.nextChecker());
  }
}
class SubQueryGroupParser {
  constructor(internalCheckers, internalParser, matchCase) {
    this.internalCheckers = internalCheckers;
    this.internalParser = internalParser;
    this.matchCase = matchCase;
  }
  static start(matchCase) {
    return new SubQueryGroupParser(
      [],
      new DefaultSubQueryParser(matchCase),
      matchCase
    );
  }
  parse(char) {
    if (char === `)` && !this.containsNestedGroupParser()) {
      return null;
    }
    const nextParser = this.internalParser.parse(char);
    if (nextParser != null) {
      return new SubQueryGroupParser(
        this.internalCheckers,
        nextParser,
        this.matchCase
      );
    } else {
      if (this.internalParser instanceof SubQueryWordParser) {
        switch (this.internalParser.buffer.toLocaleLowerCase()) {
          case "or": {
            return new SubQueryGroupParser(
              [],
              SubQueryEitherParser.start(
                group(this.internalCheckers),
                this.matchCase
              ),
              this.matchCase
            );
          }
          case "and": {
            return new SubQueryGroupParser(
              this.internalCheckers,
              new DefaultSubQueryParser(this.matchCase),
              this.matchCase
            );
          }
        }
      }
      return new SubQueryGroupParser(
        this.endInternalParser(),
        new DefaultSubQueryParser(this.matchCase),
        this.matchCase
      );
    }
  }
  containsNestedGroupParser() {
    return this.internalParser instanceof SubQueryGroupParser || isParentParser(this.internalParser) && this.internalParser.containsNestedGroupParser();
  }
  endInternalParser() {
    const checker = this.internalParser.end();
    if (checker != null) {
      return this.internalCheckers.concat([checker]);
    }
    return this.internalCheckers;
  }
  end() {
    return group(this.endInternalParser());
  }
}
class SubQueryNegatedParser {
  constructor(matchCase, internalParser = new DefaultSubQueryParser(matchCase)) {
    this.matchCase = matchCase;
    this.internalParser = internalParser;
  }
  parse(char) {
    const nextParser = this.internalParser.parse(char);
    if (nextParser == null) {
      return null;
    }
    return new SubQueryNegatedParser(this.matchCase, nextParser);
  }
  containsNestedGroupParser() {
    return this.internalParser instanceof SubQueryGroupParser || isParentParser(this.internalParser) && this.internalParser.containsNestedGroupParser();
  }
  end() {
    const result = this.internalParser.end();
    if (isStringChecker(result)) {
      return not(result);
    }
  }
}
class DefaultSubQueryParser {
  constructor(matchCase) {
    this.matchCase = matchCase;
  }
  parse(char) {
    switch (char) {
      case `-`: {
        return new SubQueryNegatedParser(this.matchCase);
      }
      case `"`: {
        return new SubQueryPhraseParser(this.matchCase);
      }
      case `(`: {
        return SubQueryGroupParser.start(this.matchCase);
      }
      case ` `: {
        return this;
      }
      default: {
        return new SubQueryWordParser(char, this.matchCase);
      }
    }
  }
  end() {
  }
}
class MetadataTagFilter {
  constructor(checker) {
    this.checker = checker;
  }
  appliesTo(metadata) {
    const tags = metadata == null ? void 0 : metadata.tags;
    if (tags != null) {
      if (tags.some((tag) => this.checker.matches(`#${tag.tag}`))) {
        return true;
      }
    }
    const frontmatter = metadata == null ? void 0 : metadata.frontmatter;
    if (frontmatter == null)
      return false;
    if (this.checkTags(frontmatter.tag)) {
      return true;
    }
    if (this.checkTags(frontmatter.tags)) {
      return true;
    }
    return false;
  }
  checkTags(tags) {
    if (tags == null) {
      return false;
    }
    if (typeof tags === "string") {
      const match = this.checker.matches(tags);
      return match;
    }
    if (Array.isArray(tags)) {
      const match = tags.some((tag) => this.checker.matches(tag));
      return match;
    }
  }
}
class FileTagsFilter {
  constructor(tagChecker, metadata) {
    __publicField(this, "metadataFilter");
    this.metadata = metadata;
    this.metadataFilter = new MetadataTagFilter(tagChecker);
  }
  async appliesTo(file) {
    const cache = this.metadata.getFileCache(file);
    return this.metadataFilter.appliesTo(cache);
  }
  and(filter) {
    return matchAll(this, filter);
  }
  or(filter) {
    return or(this, filter);
  }
}
class OperatorParser {
  constructor(operator, metadata, internalParser, matchCase) {
    this.operator = operator;
    this.metadata = metadata;
    this.internalParser = internalParser;
    this.matchCase = matchCase;
  }
  static start(operator, metadata, matchCase) {
    return new OperatorParser(
      operator,
      metadata,
      new DefaultSubQueryParser(matchCase),
      matchCase
    );
  }
  parse(char) {
    if (this.operator === "tag" && char === "#")
      return this;
    const nextParser = this.internalParser.parse(char);
    if (nextParser == null) {
      return null;
    }
    return new OperatorParser(
      this.operator,
      this.metadata,
      nextParser,
      this.matchCase
    );
  }
  containsNestedGroupParser() {
    return this.internalParser instanceof SubQueryGroupParser || isParentParser(this.internalParser) && this.internalParser.containsNestedGroupParser();
  }
  end(activeFilter) {
    const checker = this.internalParser.end();
    if (isStringChecker(checker)) {
      switch (this.operator) {
        case "file": {
          return activeFilter.and(new FileNameFilter(checker));
        }
        case "path": {
          return activeFilter.and(new FilePathFilter(checker));
        }
        case "content": {
          return activeFilter.and(new FileContentFilter(checker));
        }
        case "tag": {
          return activeFilter.and(
            new FileTagsFilter(checker, this.metadata)
          );
        }
      }
    }
    return activeFilter;
  }
}
class MetatdataPropertyFilter {
  constructor(property, value) {
    this.property = property;
    this.value = value;
  }
  appliesTo(metadata) {
    const properties = metadata == null ? void 0 : metadata.frontmatter;
    if (properties == null)
      return false;
    const keys = Object.keys(properties).filter(
      (key) => this.property.matches(key)
    );
    if (keys.length === 0)
      return false;
    if (this.value == null)
      return true;
    return keys.some((key) => {
      var _a;
      const value = (_a = properties[key]) == null ? void 0 : _a.toString();
      if (value == null)
        return false;
      return this.value.matches(value);
    });
  }
}
class FilePropertyFilter {
  constructor(metadata, property, value) {
    __publicField(this, "metadataFilter");
    this.metadata = metadata;
    this.metadataFilter = new MetatdataPropertyFilter(property, value);
  }
  async appliesTo(file) {
    const cache = this.metadata.getFileCache(file);
    return this.metadataFilter.appliesTo(cache);
  }
  and(filter) {
    return matchAll(this, filter);
  }
  or(filter) {
    return or(this, filter);
  }
}
function negate(filters) {
  if (Array.isArray(filters)) {
    return negateSingle(matchAll(filters));
  }
  return negateSingle(filters);
}
function negateSingle(filter) {
  if (filter instanceof Negation)
    return filter.negate();
  return new Negation(filter);
}
class Negation {
  constructor(negated) {
    this.negated = negated;
  }
  async appliesTo(file) {
    return !this.negated.appliesTo(file);
  }
  negate() {
    return this.negated;
  }
  and(filter) {
    return matchAll(this, filter);
  }
  or(filter) {
    return or(this, filter);
  }
}
class EitherPerser {
  constructor(metadata, filterType, matchCase, collectedBFilters = [], internalParser = new DefaultParser(metadata, filterType, matchCase)) {
    this.metadata = metadata;
    this.filterType = filterType;
    this.matchCase = matchCase;
    this.collectedBFilters = collectedBFilters;
    this.internalParser = internalParser;
  }
  static start(metadata, filterType, matchCase) {
    return new EitherPerser(metadata, filterType, matchCase);
  }
  parse(char) {
    const nextParser = this.internalParser.parse(char);
    if (nextParser == null) {
      const filterOrChecker = this.internalParser.end(EmtpyFilter);
      if (isFileFilter(filterOrChecker)) {
        return new EitherPerser(
          this.metadata,
          this.filterType,
          this.matchCase,
          this.collectedBFilters.concat([filterOrChecker])
        );
      }
      return new EitherPerser(
        this.metadata,
        this.filterType,
        this.matchCase
      );
    }
    return new EitherPerser(
      this.metadata,
      this.filterType,
      this.matchCase,
      this.collectedBFilters,
      nextParser
    );
  }
  end(activeFilter) {
    const filterOrChecker = this.internalParser.end(EmtpyFilter);
    if (isFileFilter(filterOrChecker)) {
      return activeFilter.or(matchAll(this.collectedBFilters.concat([filterOrChecker])));
    }
    return activeFilter;
  }
}
class WordParser {
  constructor(subParser, filterType, metadata, matchCase) {
    this.subParser = subParser;
    this.filterType = filterType;
    this.metadata = metadata;
    this.matchCase = matchCase;
  }
  static start(buffer, filterType, metadata, matchCase) {
    return new WordParser(
      new SubQueryWordParser(buffer, matchCase),
      filterType,
      metadata,
      matchCase
    );
  }
  get buffer() {
    return this.subParser.buffer;
  }
  parse(char) {
    if (char === `:`) {
      const buffer = this.subParser.buffer;
      switch (buffer) {
        case `file`:
        case `path`:
        case "content":
        case "tag": {
          return OperatorParser.start(buffer, this.metadata, this.matchCase);
        }
      }
      return new DefaultParser(this.metadata);
    }
    const nextParser = this.subParser.parse(char);
    if (nextParser == null) {
      switch (this.buffer.toLocaleLowerCase()) {
        case "or": {
          return EitherPerser.start(this.metadata, this.filterType, this.matchCase);
        }
        case "and": {
          return new DefaultParser(this.metadata);
        }
      }
      return null;
    }
    return new WordParser(
      nextParser,
      this.filterType,
      this.metadata,
      this.matchCase
    );
  }
  end(activeFilter) {
    const checker = this.subParser.end();
    if (checker != null) {
      return activeFilter.and(this.filterType(checker));
    }
    return activeFilter;
  }
}
class GroupParser {
  constructor(metadata, filterType, internalFilter, internalParser, matchCase) {
    this.metadata = metadata;
    this.filterType = filterType;
    this.internalFilter = internalFilter;
    this.internalParser = internalParser;
    this.matchCase = matchCase;
  }
  static start(metadata, filterType, matchCase) {
    return new GroupParser(
      metadata,
      filterType,
      EmtpyFilter,
      new DefaultParser(metadata, filterType, matchCase),
      matchCase
    );
  }
  parse(char) {
    if (char === `)` && !this.containsNestedGroupParser()) {
      return null;
    }
    const nextParser = this.internalParser.parse(char);
    if (nextParser != null) {
      return new GroupParser(
        this.metadata,
        this.filterType,
        this.internalFilter,
        nextParser,
        this.matchCase
      );
    } else {
      const filter = this.endInternalParser();
      return new GroupParser(
        this.metadata,
        this.filterType,
        filter,
        new DefaultParser(
          this.metadata,
          this.filterType,
          this.matchCase
        ),
        this.matchCase
      );
    }
  }
  containsNestedGroupParser() {
    return this.internalParser instanceof GroupParser || isParentParser(this.internalParser) && this.internalParser.containsNestedGroupParser();
  }
  endInternalParser() {
    const filter = this.internalParser.end(this.internalFilter);
    if (isFileFilter(filter)) {
      return filter;
    }
    return this.internalFilter;
  }
  end(activeFilter) {
    const filter = this.endInternalParser();
    return activeFilter.and(filter);
  }
}
class NegatedParser {
  constructor(metadata, filterType, internalParser, matchCase) {
    this.metadata = metadata;
    this.filterType = filterType;
    this.internalParser = internalParser;
    this.matchCase = matchCase;
  }
  static start(metadata, filterType, matchCase) {
    return new NegatedParser(
      metadata,
      filterType,
      new DefaultParser(metadata, filterType, matchCase),
      matchCase
    );
  }
  parse(char) {
    const nextParser = this.internalParser.parse(char);
    if (nextParser == null) {
      return null;
    }
    return new NegatedParser(
      this.metadata,
      this.filterType,
      nextParser,
      this.matchCase
    );
  }
  containsNestedGroupParser() {
    return this.internalParser instanceof GroupParser || isParentParser(this.internalParser) && this.internalParser.containsNestedGroupParser();
  }
  end(activeFilter) {
    const result = this.internalParser.end(EmtpyFilter);
    if (isFileFilter(result)) {
      return activeFilter.and(negate(result));
    }
    return activeFilter;
  }
}
class PhraseParser {
  constructor(filterType, matchCase = true) {
    __publicField(this, "subParser");
    this.filterType = filterType;
    this.subParser = new SubQueryPhraseParser(matchCase);
  }
  parse(char) {
    const nextParser = this.subParser.parse(char);
    if (nextParser == null) {
      return null;
    }
    this.subParser = nextParser;
    return this;
  }
  end(activeFilter) {
    const checker = this.subParser.end();
    if (checker != null) {
      return activeFilter.and(this.filterType(checker));
    }
    return activeFilter;
  }
}
function regex(regex2, matchCase = false) {
  if (typeof regex2 === "string" || regex2 instanceof RegExp) {
    return new Regex(new RegExp(regex2));
  }
  return new Regex(new RegExp(regex2.join("")));
}
class Regex {
  constructor(regex2, matchCase = false) {
    __publicField(this, "regex");
    if (matchCase && regex2.flags.includes("i")) {
      this.regex = new RegExp(regex2, regex2.flags.split("").filter((it) => it !== "i").join(""));
    } else if (!matchCase && !regex2.flags.includes("i")) {
      this.regex = new RegExp(regex2, regex2.flags + "i");
    } else {
      this.regex = regex2;
    }
  }
  matches(test) {
    return this.regex.test(test);
  }
  or(checker) {
    return new Or(this, checker);
  }
  and(checker) {
    return group(this, checker);
  }
}
class SubQueryRegexParser {
  constructor(matchCase = true) {
    __publicField(this, "escaped", false);
    __publicField(this, "buffer", "");
    this.matchCase = matchCase;
  }
  parse(char) {
    switch (char) {
      case `\\`: {
        if (!this.escaped) {
          this.escaped = true;
          return this;
        }
      }
      case `/`: {
        if (!this.escaped) {
          return null;
        }
      }
    }
    this.escaped = false;
    this.buffer += char;
    return this;
  }
  end() {
    if (this.buffer.length > 0) {
      return regex(this.buffer, this.matchCase);
    }
  }
}
class RegexParser {
  constructor(filterType, matchCase = true) {
    __publicField(this, "subParser");
    this.filterType = filterType;
    this.subParser = new SubQueryRegexParser(matchCase);
  }
  parse(char) {
    const nextParser = this.subParser.parse(char);
    if (nextParser == null) {
      return null;
    }
    this.subParser = nextParser;
    return this;
  }
  end(activeFilter) {
    const checker = this.subParser.end();
    if (checker != null) {
      return activeFilter.and(this.filterType(checker));
    }
    return activeFilter;
  }
}
function parseProperty(metadata) {
  return new PropertyNameParser([], metadata);
}
class PropertyNameParser {
  constructor(checkers, metadata, parser = new DefaultSubQueryParser()) {
    this.checkers = checkers;
    this.metadata = metadata;
    this.parser = parser;
  }
  parse(char) {
    if (char === `]`) {
      return null;
    }
    if (char === `:`) {
      return new PropertyValueParser(
        group(this.endInternalParser()),
        this.metadata
      );
    }
    const next = this.parser.parse(char);
    if (next == null) {
      return new PropertyNameParser(
        this.endInternalParser(),
        this.metadata
      );
    }
    return new PropertyNameParser(this.checkers, this.metadata, next);
  }
  endInternalParser() {
    const checker = this.parser.end();
    if (checker != null) {
      return this.checkers.concat([checker]);
    }
    return this.checkers;
  }
  end(activeFilter) {
    return activeFilter.and(
      new FilePropertyFilter(
        this.metadata,
        group(this.endInternalParser())
      )
    );
  }
}
class PropertyValueParser {
  constructor(property, metadata, checkers = [], parser = new DefaultSubQueryParser()) {
    this.property = property;
    this.metadata = metadata;
    this.checkers = checkers;
    this.parser = parser;
  }
  parse(char) {
    if (char === `]`) {
      return null;
    }
    const next = this.parser.parse(char);
    if (next == null) {
      return new PropertyValueParser(
        this.property,
        this.metadata,
        this.endInternalParser(),
        new DefaultSubQueryParser()
      );
    }
    return new PropertyValueParser(
      this.property,
      this.metadata,
      this.checkers,
      next
    );
  }
  endInternalParser() {
    const checker = this.parser.end();
    if (checker != null) {
      return this.checkers.concat([checker]);
    }
    return this.checkers;
  }
  end(activeFilter) {
    return activeFilter.and(
      new FilePropertyFilter(
        this.metadata,
        this.property,
        group(this.endInternalParser())
      )
    );
  }
}
class DefaultParser {
  constructor(metadata, filterType = (checker) => new FileContentFilter(checker), matchCase) {
    this.metadata = metadata;
    this.filterType = filterType;
    this.matchCase = matchCase;
  }
  parse(char) {
    switch (char) {
      case `-`: {
        return NegatedParser.start(this.metadata, this.filterType, this.matchCase);
      }
      case `"`: {
        return new PhraseParser(this.filterType, this.matchCase);
      }
      case `/`: {
        return new RegexParser(this.filterType, this.matchCase);
      }
      case `(`: {
        return GroupParser.start(this.metadata, this.filterType, this.matchCase);
      }
      case `[`: {
        return parseProperty(this.metadata);
      }
      case ` `: {
        return null;
      }
      default: {
        return WordParser.start(char, this.filterType, this.metadata, this.matchCase);
      }
    }
  }
  end(activeFilter) {
    return activeFilter;
  }
}
const EmtpyFilter = {
  async appliesTo(file) {
    return false;
  },
  and(filter) {
    return filter;
  },
  or(filter) {
    return filter;
  }
};
function parse(query, metadata, filter = EmtpyFilter) {
  query = query.trim();
  let parser = new DefaultParser(metadata);
  for (const char of query) {
    const nextParser = parser.parse(char);
    if (nextParser == null) {
      const checker2 = parser.end(filter);
      if (isFileFilter(checker2)) {
        filter = checker2;
      }
      parser = new DefaultParser(metadata);
    } else {
      parser = nextParser;
    }
  }
  const checker = parser.end(filter);
  if (isFileFilter(checker)) {
    return checker;
  }
  return filter;
}
const MatchAllEmptyQuery = {
  async appliesTo(file) {
    return true;
  },
  and(filter) {
    return filter;
  },
  or(filter) {
    return filter;
  }
};
class ObsidianNoteRepository {
  constructor(files, metadata) {
    __privateAdd(this, _files, void 0);
    __privateAdd(this, _metadata, void 0);
    __privateSet(this, _files, files);
    __privateSet(this, _metadata, metadata);
  }
  getNoteForFile(file) {
    return new ObsidianNote(file, __privateGet(this, _metadata));
  }
  getFileFromNote(note) {
    if (note instanceof ObsidianNote) {
      return note.file();
    }
    return null;
  }
  listAll() {
    return Promise.resolve(
      __privateGet(this, _files).getMarkdownFiles().map((tFile) => new ObsidianNote(tFile, __privateGet(this, _metadata)))
    );
  }
  async listAllMatchingQuery(query) {
    const filter = parse(query, __privateGet(this, _metadata), MatchAllEmptyQuery);
    const notes = (await Promise.all(
      __privateGet(this, _files).getMarkdownFiles().map(async (tFile) => {
        if (!await filter.appliesTo(tFile)) {
          return new ObsidianNote(tFile, __privateGet(this, _metadata));
        }
      })
    )).filter((note) => !!note);
    return {
      filter: new ObsidianNoteFilter(filter, query),
      notes
    };
  }
  getNoteFilterForQuery(query) {
    return new ObsidianNoteFilter(
      parse(query, __privateGet(this, _metadata), MatchAllEmptyQuery),
      query
    );
  }
  getInclusiveNoteFilterForQuery(query) {
    return new ObsidianNoteFilter(
      parse(query, __privateGet(this, _metadata), MatchAllEmptyQuery),
      query
    );
  }
  getExclusiveNoteFilterForQuery(query) {
    return new ObsidianNoteFilter(
      parse(query, __privateGet(this, _metadata), EmtpyFilter),
      query
    );
  }
}
_files = new WeakMap();
_metadata = new WeakMap();
class ObsidianNoteFilter {
  constructor(filter, query) {
    __privateAdd(this, _filter, void 0);
    __privateAdd(this, _query, void 0);
    __privateSet(this, _filter, filter);
    __privateSet(this, _query, query);
  }
  query() {
    return __privateGet(this, _query);
  }
  async matches(note) {
    if (note instanceof ObsidianNote) {
      return await __privateGet(this, _filter).appliesTo(note.file());
    }
    return false;
  }
}
_filter = new WeakMap();
_query = new WeakMap();
class ObsidianNote {
  constructor(tFile, metadata) {
    __privateAdd(this, _tFile, void 0);
    __privateAdd(this, _metadata2, void 0);
    __privateSet(this, _tFile, tFile);
    __privateSet(this, _metadata2, metadata);
  }
  id() {
    return __privateGet(this, _tFile).path;
  }
  file() {
    return __privateGet(this, _tFile);
  }
  name() {
    return __privateGet(this, _tFile).basename;
  }
  created() {
    return __privateGet(this, _tFile).stat.ctime;
  }
  modified() {
    return __privateGet(this, _tFile).stat.mtime;
  }
  properties() {
    var _a, _b;
    return (_b = (_a = __privateGet(this, _metadata2).getFileCache(__privateGet(this, _tFile))) == null ? void 0 : _a.frontmatter) != null ? _b : {};
  }
}
_tFile = new WeakMap();
_metadata2 = new WeakMap();
function getPropertySelector(property) {
  if (property.name() === NoteProperty.Created.name()) {
    return FileCreationSelector;
  }
  if (property.name() === NoteProperty.Modified.name()) {
    return FileModificationSelector;
  }
  const type = property.type().toLocaleLowerCase();
  if (type === "date" || type === "datetime") {
    return new DatePropertySelector(property.name());
  }
  return new NumberPropertySelector(property.name());
}
const NoPropertySelector = {
  selectProperty(file) {
    return 0;
  }
};
const FileCreationSelector = {
  selectProperty(file) {
    return file.created();
  }
};
const FileModificationSelector = {
  selectProperty(file) {
    return file.modified();
  }
};
class DatePropertySelector {
  constructor(property) {
    this.property = property;
  }
  selectProperty(file) {
    const metadata = file.properties();
    if (metadata == null) {
      return 0;
    }
    const value = metadata[this.property];
    if (value == null)
      return 0;
    const date = new Date(value);
    const valueOf = date.valueOf();
    return valueOf;
  }
}
class NumberPropertySelector {
  constructor(property) {
    this.property = property;
  }
  selectProperty(file) {
    const metadata = file.properties();
    if (metadata == null) {
      return 0;
    }
    const value = metadata[this.property];
    if (value == null)
      return 0;
    if (typeof value === "string") {
      return parseFloat(value);
    }
    return value;
  }
}
async function createNewTimeline(notes, initiallyOrderBy) {
  var _a, _b;
  const propertySelector = getPropertySelector(initiallyOrderBy);
  const allNotes = (await notes.listAll()).toSorted(
    (a, b) => propertySelector.selectProperty(a) - propertySelector.selectProperty(b)
  );
  const minValue = (_a = selectPropertyFromNote(propertySelector, allNotes.at(0))) != null ? _a : 0;
  const maxValue = (_b = selectPropertyFromNote(propertySelector, allNotes.at(-1))) != null ? _b : 0;
  const range = maxValue - minValue;
  const focalValue = minValue + range / 2;
  return {
    focalValue
  };
}
function selectPropertyFromNote(propertySelector, note) {
  if (!note)
    return void 0;
  return propertySelector.selectProperty(note);
}
function noop() {
}
const identity = (x) => x;
function assign(tar, src) {
  for (const k in src)
    tar[k] = src[k];
  return (
    /** @type {T & S} */
    tar
  );
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a && typeof a === "object" || typeof a === "function";
}
function is_empty(obj) {
  return Object.keys(obj).length === 0;
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    for (const callback of callbacks) {
      callback(void 0);
    }
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function get_store_value(store) {
  let value;
  subscribe(store, (_) => value = _)();
  return value;
}
function component_subscribe(component, store, callback) {
  component.$$.on_destroy.push(subscribe(store, callback));
}
function create_slot(definition, ctx, $$scope, fn) {
  if (definition) {
    const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
    return definition[0](slot_ctx);
  }
}
function get_slot_context(definition, ctx, $$scope, fn) {
  return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
  if (definition[2] && fn) {
    const lets = definition[2](fn(dirty));
    if ($$scope.dirty === void 0) {
      return lets;
    }
    if (typeof lets === "object") {
      const merged = [];
      const len = Math.max($$scope.dirty.length, lets.length);
      for (let i = 0; i < len; i += 1) {
        merged[i] = $$scope.dirty[i] | lets[i];
      }
      return merged;
    }
    return $$scope.dirty | lets;
  }
  return $$scope.dirty;
}
function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
  if (slot_changes) {
    const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
    slot.p(slot_context, slot_changes);
  }
}
function get_all_dirty_from_scope($$scope) {
  if ($$scope.ctx.length > 32) {
    const dirty = [];
    const length = $$scope.ctx.length / 32;
    for (let i = 0; i < length; i++) {
      dirty[i] = -1;
    }
    return dirty;
  }
  return -1;
}
function exclude_internal_props(props) {
  const result = {};
  for (const k in props)
    if (k[0] !== "$")
      result[k] = props[k];
  return result;
}
function compute_rest_props(props, keys) {
  const rest = {};
  keys = new Set(keys);
  for (const k in props)
    if (!keys.has(k) && k[0] !== "$")
      rest[k] = props[k];
  return rest;
}
function set_store_value(store, ret, value) {
  store.set(value);
  return ret;
}
function action_destroyer(action_result) {
  return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
}
const is_client = typeof window !== "undefined";
let now = is_client ? () => window.performance.now() : () => Date.now();
let raf = is_client ? (cb) => requestAnimationFrame(cb) : noop;
const tasks = /* @__PURE__ */ new Set();
function run_tasks(now2) {
  tasks.forEach((task) => {
    if (!task.c(now2)) {
      tasks.delete(task);
      task.f();
    }
  });
  if (tasks.size !== 0)
    raf(run_tasks);
}
function loop(callback) {
  let task;
  if (tasks.size === 0)
    raf(run_tasks);
  return {
    promise: new Promise((fulfill) => {
      tasks.add(task = { c: callback, f: fulfill });
    }),
    abort() {
      tasks.delete(task);
    }
  };
}
const globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : (
  // @ts-ignore Node typings have this
  global
);
function append(target, node) {
  target.appendChild(node);
}
function get_root_for_style(node) {
  if (!node)
    return document;
  const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
  if (root && /** @type {ShadowRoot} */
  root.host) {
    return (
      /** @type {ShadowRoot} */
      root
    );
  }
  return node.ownerDocument;
}
function append_empty_stylesheet(node) {
  const style_element = element("style");
  style_element.textContent = "/* empty */";
  append_stylesheet(get_root_for_style(node), style_element);
  return style_element.sheet;
}
function append_stylesheet(node, style) {
  append(
    /** @type {Document} */
    node.head || node,
    style
  );
  return style.sheet;
}
function insert(target, node, anchor) {
  target.insertBefore(node, anchor || null);
}
function detach(node) {
  if (node.parentNode) {
    node.parentNode.removeChild(node);
  }
}
function destroy_each(iterations, detaching) {
  for (let i = 0; i < iterations.length; i += 1) {
    if (iterations[i])
      iterations[i].d(detaching);
  }
}
function element(name) {
  return document.createElement(name);
}
function svg_element(name) {
  return document.createElementNS("http://www.w3.org/2000/svg", name);
}
function text(data) {
  return document.createTextNode(data);
}
function space() {
  return text(" ");
}
function empty() {
  return text("");
}
function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return () => node.removeEventListener(event, handler, options);
}
function prevent_default(fn) {
  return function(event) {
    event.preventDefault();
    return fn.call(this, event);
  };
}
function stop_propagation(fn) {
  return function(event) {
    event.stopPropagation();
    return fn.call(this, event);
  };
}
function self(fn) {
  return function(event) {
    if (event.target === this)
      fn.call(this, event);
  };
}
function attr(node, attribute, value) {
  if (value == null)
    node.removeAttribute(attribute);
  else if (node.getAttribute(attribute) !== value)
    node.setAttribute(attribute, value);
}
const always_set_through_set_attribute = ["width", "height"];
function set_attributes(node, attributes) {
  const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
  for (const key in attributes) {
    if (attributes[key] == null) {
      node.removeAttribute(key);
    } else if (key === "style") {
      node.style.cssText = attributes[key];
    } else if (key === "__value") {
      node.value = node[key] = attributes[key];
    } else if (descriptors[key] && descriptors[key].set && always_set_through_set_attribute.indexOf(key) === -1) {
      node[key] = attributes[key];
    } else {
      attr(node, key, attributes[key]);
    }
  }
}
function children(element2) {
  return Array.from(element2.childNodes);
}
function set_data(text2, data) {
  data = "" + data;
  if (text2.data === data)
    return;
  text2.data = /** @type {string} */
  data;
}
function set_input_value(input, value) {
  input.value = value == null ? "" : value;
}
function set_style(node, key, value, important) {
  if (value == null) {
    node.style.removeProperty(key);
  } else {
    node.style.setProperty(key, value, important ? "important" : "");
  }
}
function select_option(select, value, mounting) {
  for (let i = 0; i < select.options.length; i += 1) {
    const option = select.options[i];
    if (option.__value === value) {
      option.selected = true;
      return;
    }
  }
  if (!mounting || value !== void 0) {
    select.selectedIndex = -1;
  }
}
function select_options(select, value) {
  for (let i = 0; i < select.options.length; i += 1) {
    const option = select.options[i];
    option.selected = ~value.indexOf(option.__value);
  }
}
let crossorigin;
function is_crossorigin() {
  if (crossorigin === void 0) {
    crossorigin = false;
    try {
      if (typeof window !== "undefined" && window.parent) {
        void window.parent.document;
      }
    } catch (error) {
      crossorigin = true;
    }
  }
  return crossorigin;
}
function add_iframe_resize_listener(node, fn) {
  const computed_style = getComputedStyle(node);
  if (computed_style.position === "static") {
    node.style.position = "relative";
  }
  const iframe = element("iframe");
  iframe.setAttribute(
    "style",
    "display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"
  );
  iframe.setAttribute("aria-hidden", "true");
  iframe.tabIndex = -1;
  const crossorigin2 = is_crossorigin();
  let unsubscribe;
  if (crossorigin2) {
    iframe.src = "data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>";
    unsubscribe = listen(
      window,
      "message",
      /** @param {MessageEvent} event */
      (event) => {
        if (event.source === iframe.contentWindow)
          fn();
      }
    );
  } else {
    iframe.src = "about:blank";
    iframe.onload = () => {
      unsubscribe = listen(iframe.contentWindow, "resize", fn);
      fn();
    };
  }
  append(node, iframe);
  return () => {
    if (crossorigin2) {
      unsubscribe();
    } else if (unsubscribe && iframe.contentWindow) {
      unsubscribe();
    }
    detach(iframe);
  };
}
function toggle_class(element2, name, toggle) {
  element2.classList.toggle(name, !!toggle);
}
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
  return new CustomEvent(type, { detail, bubbles, cancelable });
}
const managed_styles = /* @__PURE__ */ new Map();
let active = 0;
function hash(str) {
  let hash2 = 5381;
  let i = str.length;
  while (i--)
    hash2 = (hash2 << 5) - hash2 ^ str.charCodeAt(i);
  return hash2 >>> 0;
}
function create_style_information(doc, node) {
  const info = { stylesheet: append_empty_stylesheet(node), rules: {} };
  managed_styles.set(doc, info);
  return info;
}
function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
  const step = 16.666 / duration;
  let keyframes = "{\n";
  for (let p = 0; p <= 1; p += step) {
    const t = a + (b - a) * ease(p);
    keyframes += p * 100 + `%{${fn(t, 1 - t)}}
`;
  }
  const rule = keyframes + `100% {${fn(b, 1 - b)}}
}`;
  const name = `__svelte_${hash(rule)}_${uid}`;
  const doc = get_root_for_style(node);
  const { stylesheet, rules } = managed_styles.get(doc) || create_style_information(doc, node);
  if (!rules[name]) {
    rules[name] = true;
    stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
  }
  const animation = node.style.animation || "";
  node.style.animation = `${animation ? `${animation}, ` : ""}${name} ${duration}ms linear ${delay}ms 1 both`;
  active += 1;
  return name;
}
function delete_rule(node, name) {
  const previous = (node.style.animation || "").split(", ");
  const next = previous.filter(
    name ? (anim) => anim.indexOf(name) < 0 : (anim) => anim.indexOf("__svelte") === -1
    // remove all Svelte animations
  );
  const deleted = previous.length - next.length;
  if (deleted) {
    node.style.animation = next.join(", ");
    active -= deleted;
    if (!active)
      clear_rules();
  }
}
function clear_rules() {
  raf(() => {
    if (active)
      return;
    managed_styles.forEach((info) => {
      const { ownerNode } = info.stylesheet;
      if (ownerNode)
        detach(ownerNode);
    });
    managed_styles.clear();
  });
}
let current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}
function createEventDispatcher() {
  const component = get_current_component();
  return (type, detail, { cancelable = false } = {}) => {
    const callbacks = component.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(
        /** @type {string} */
        type,
        detail,
        { cancelable }
      );
      callbacks.slice().forEach((fn) => {
        fn.call(component, event);
      });
      return !event.defaultPrevented;
    }
    return true;
  };
}
function bubble(component, event) {
  const callbacks = component.$$.callbacks[event.type];
  if (callbacks) {
    callbacks.slice().forEach((fn) => fn.call(this, event));
  }
}
const dirty_components = [];
const binding_callbacks = [];
let render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = /* @__PURE__ */ Promise.resolve();
let update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
function add_flush_callback(fn) {
  flush_callbacks.push(fn);
}
const seen_callbacks = /* @__PURE__ */ new Set();
let flushidx = 0;
function flush() {
  if (flushidx !== 0) {
    return;
  }
  const saved_component = current_component;
  do {
    try {
      while (flushidx < dirty_components.length) {
        const component = dirty_components[flushidx];
        flushidx++;
        set_current_component(component);
        update(component.$$);
      }
    } catch (e) {
      dirty_components.length = 0;
      flushidx = 0;
      throw e;
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length)
      binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
function flush_render_callbacks(fns) {
  const filtered = [];
  const targets = [];
  render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
  targets.forEach((c) => c());
  render_callbacks = filtered;
}
let promise;
function wait() {
  if (!promise) {
    promise = Promise.resolve();
    promise.then(() => {
      promise = null;
    });
  }
  return promise;
}
function dispatch(node, direction, kind) {
  node.dispatchEvent(custom_event(`${direction ? "intro" : "outro"}${kind}`));
}
const outroing = /* @__PURE__ */ new Set();
let outros;
function group_outros() {
  outros = {
    r: 0,
    c: [],
    p: outros
    // parent group
  };
}
function check_outros() {
  if (!outros.r) {
    run_all(outros.c);
  }
  outros = outros.p;
}
function transition_in(block, local) {
  if (block && block.i) {
    outroing.delete(block);
    block.i(local);
  }
}
function transition_out(block, local, detach2, callback) {
  if (block && block.o) {
    if (outroing.has(block))
      return;
    outroing.add(block);
    outros.c.push(() => {
      outroing.delete(block);
      if (callback) {
        if (detach2)
          block.d(1);
        callback();
      }
    });
    block.o(local);
  } else if (callback) {
    callback();
  }
}
const null_transition = { duration: 0 };
function create_bidirectional_transition(node, fn, params, intro) {
  const options = { direction: "both" };
  let config = fn(node, params, options);
  let t = intro ? 0 : 1;
  let running_program = null;
  let pending_program = null;
  let animation_name = null;
  let original_inert_value;
  function clear_animation() {
    if (animation_name)
      delete_rule(node, animation_name);
  }
  function init2(program, duration) {
    const d = (
      /** @type {Program['d']} */
      program.b - t
    );
    duration *= Math.abs(d);
    return {
      a: t,
      b: program.b,
      d,
      duration,
      start: program.start,
      end: program.start + duration,
      group: program.group
    };
  }
  function go(b) {
    const {
      delay = 0,
      duration = 300,
      easing = identity,
      tick = noop,
      css
    } = config || null_transition;
    const program = {
      start: now() + delay,
      b
    };
    if (!b) {
      program.group = outros;
      outros.r += 1;
    }
    if ("inert" in node) {
      if (b) {
        if (original_inert_value !== void 0) {
          node.inert = original_inert_value;
        }
      } else {
        original_inert_value = /** @type {HTMLElement} */
        node.inert;
        node.inert = true;
      }
    }
    if (running_program || pending_program) {
      pending_program = program;
    } else {
      if (css) {
        clear_animation();
        animation_name = create_rule(node, t, b, duration, delay, easing, css);
      }
      if (b)
        tick(0, 1);
      running_program = init2(program, duration);
      add_render_callback(() => dispatch(node, b, "start"));
      loop((now2) => {
        if (pending_program && now2 > pending_program.start) {
          running_program = init2(pending_program, duration);
          pending_program = null;
          dispatch(node, running_program.b, "start");
          if (css) {
            clear_animation();
            animation_name = create_rule(
              node,
              t,
              running_program.b,
              running_program.duration,
              0,
              easing,
              config.css
            );
          }
        }
        if (running_program) {
          if (now2 >= running_program.end) {
            tick(t = running_program.b, 1 - t);
            dispatch(node, running_program.b, "end");
            if (!pending_program) {
              if (running_program.b) {
                clear_animation();
              } else {
                if (!--running_program.group.r)
                  run_all(running_program.group.c);
              }
            }
            running_program = null;
          } else if (now2 >= running_program.start) {
            const p = now2 - running_program.start;
            t = running_program.a + running_program.d * easing(p / running_program.duration);
            tick(t, 1 - t);
          }
        }
        return !!(running_program || pending_program);
      });
    }
  }
  return {
    run(b) {
      if (is_function(config)) {
        wait().then(() => {
          const opts = { direction: b ? "in" : "out" };
          config = config(opts);
          go(b);
        });
      } else {
        go(b);
      }
    },
    end() {
      clear_animation();
      running_program = pending_program = null;
    }
  };
}
function ensure_array_like(array_like_or_iterator) {
  return (array_like_or_iterator == null ? void 0 : array_like_or_iterator.length) !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
}
function outro_and_destroy_block(block, lookup) {
  transition_out(block, 1, 1, () => {
    lookup.delete(block.key);
  });
}
function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block2, next, get_context) {
  let o = old_blocks.length;
  let n = list.length;
  let i = o;
  const old_indexes = {};
  while (i--)
    old_indexes[old_blocks[i].key] = i;
  const new_blocks = [];
  const new_lookup = /* @__PURE__ */ new Map();
  const deltas = /* @__PURE__ */ new Map();
  const updates = [];
  i = n;
  while (i--) {
    const child_ctx = get_context(ctx, list, i);
    const key = get_key(child_ctx);
    let block = lookup.get(key);
    if (!block) {
      block = create_each_block2(key, child_ctx);
      block.c();
    } else if (dynamic) {
      updates.push(() => block.p(child_ctx, dirty));
    }
    new_lookup.set(key, new_blocks[i] = block);
    if (key in old_indexes)
      deltas.set(key, Math.abs(i - old_indexes[key]));
  }
  const will_move = /* @__PURE__ */ new Set();
  const did_move = /* @__PURE__ */ new Set();
  function insert2(block) {
    transition_in(block, 1);
    block.m(node, next);
    lookup.set(block.key, block);
    next = block.first;
    n--;
  }
  while (o && n) {
    const new_block = new_blocks[n - 1];
    const old_block = old_blocks[o - 1];
    const new_key = new_block.key;
    const old_key = old_block.key;
    if (new_block === old_block) {
      next = new_block.first;
      o--;
      n--;
    } else if (!new_lookup.has(old_key)) {
      destroy(old_block, lookup);
      o--;
    } else if (!lookup.has(new_key) || will_move.has(new_key)) {
      insert2(new_block);
    } else if (did_move.has(old_key)) {
      o--;
    } else if (deltas.get(new_key) > deltas.get(old_key)) {
      did_move.add(new_key);
      insert2(new_block);
    } else {
      will_move.add(old_key);
      o--;
    }
  }
  while (o--) {
    const old_block = old_blocks[o];
    if (!new_lookup.has(old_block.key))
      destroy(old_block, lookup);
  }
  while (n)
    insert2(new_blocks[n - 1]);
  run_all(updates);
  return new_blocks;
}
function get_spread_update(levels, updates) {
  const update2 = {};
  const to_null_out = {};
  const accounted_for = { $$scope: 1 };
  let i = levels.length;
  while (i--) {
    const o = levels[i];
    const n = updates[i];
    if (n) {
      for (const key in o) {
        if (!(key in n))
          to_null_out[key] = 1;
      }
      for (const key in n) {
        if (!accounted_for[key]) {
          update2[key] = n[key];
          accounted_for[key] = 1;
        }
      }
      levels[i] = n;
    } else {
      for (const key in o) {
        accounted_for[key] = 1;
      }
    }
  }
  for (const key in to_null_out) {
    if (!(key in update2))
      update2[key] = void 0;
  }
  return update2;
}
function bind(component, name, callback) {
  const index = component.$$.props[name];
  if (index !== void 0) {
    component.$$.bound[index] = callback;
    callback(component.$$.ctx[index]);
  }
}
function create_component(block) {
  block && block.c();
}
function mount_component(component, target, anchor) {
  const { fragment, after_update } = component.$$;
  fragment && fragment.m(target, anchor);
  add_render_callback(() => {
    const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
    if (component.$$.on_destroy) {
      component.$$.on_destroy.push(...new_on_destroy);
    } else {
      run_all(new_on_destroy);
    }
    component.$$.on_mount = [];
  });
  after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    flush_render_callbacks($$.after_update);
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
function make_dirty(component, i) {
  if (component.$$.dirty[0] === -1) {
    dirty_components.push(component);
    schedule_update();
    component.$$.dirty.fill(0);
  }
  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
}
function init(component, options, instance2, create_fragment2, not_equal, props, append_styles, dirty = [-1]) {
  const parent_component = current_component;
  set_current_component(component);
  const $$ = component.$$ = {
    fragment: null,
    ctx: [],
    // state
    props,
    update: noop,
    not_equal,
    bound: blank_object(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
    // everything else
    callbacks: blank_object(),
    dirty,
    skip_bound: false,
    root: options.target || parent_component.$$.root
  };
  append_styles && append_styles($$.root);
  let ready = false;
  $$.ctx = instance2 ? instance2(component, options.props || {}, (i, ret, ...rest) => {
    const value = rest.length ? rest[0] : ret;
    if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
      if (!$$.skip_bound && $$.bound[i])
        $$.bound[i](value);
      if (ready)
        make_dirty(component, i);
    }
    return ret;
  }) : [];
  $$.update();
  ready = true;
  run_all($$.before_update);
  $$.fragment = create_fragment2 ? create_fragment2($$.ctx) : false;
  if (options.target) {
    if (options.hydrate) {
      const nodes = children(options.target);
      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach);
    } else {
      $$.fragment && $$.fragment.c();
    }
    if (options.intro)
      transition_in(component.$$.fragment);
    mount_component(component, options.target, options.anchor);
    flush();
  }
  set_current_component(parent_component);
}
class SvelteComponent {
  constructor() {
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    __publicField(this, "$$");
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    __publicField(this, "$$set");
  }
  /** @returns {void} */
  $destroy() {
    destroy_component(this, 1);
    this.$destroy = noop;
  }
  /**
   * @template {Extract<keyof Events, string>} K
   * @param {K} type
   * @param {((e: Events[K]) => void) | null | undefined} callback
   * @returns {() => void}
   */
  $on(type, callback) {
    if (!is_function(callback)) {
      return noop;
    }
    const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
    callbacks.push(callback);
    return () => {
      const index = callbacks.indexOf(callback);
      if (index !== -1)
        callbacks.splice(index, 1);
    };
  }
  /**
   * @param {Partial<Props>} props
   * @returns {void}
   */
  $set(props) {
    if (this.$$set && !is_empty(props)) {
      this.$$.skip_bound = true;
      this.$$set(props);
      this.$$.skip_bound = false;
    }
  }
}
const PUBLIC_VERSION = "4";
if (typeof window !== "undefined")
  (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(PUBLIC_VERSION);
const subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update2(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set, update2) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update: update2, subscribe: subscribe2 };
}
class ValuePerPixelScale {
  constructor(valuePerPixel) {
    this.valuePerPixel = valuePerPixel;
  }
  toPixels(value) {
    return Math.floor(value / this.valuePerPixel);
  }
  toValue(pixels) {
    return pixels * this.valuePerPixel;
  }
}
class TimelineNavigationSvelteImpl {
  constructor(scaleProperty, items, setFocalValue, availableWidth) {
    __publicField(this, "scale");
    this.scaleProperty = scaleProperty;
    this.items = items;
    this.setFocalValue = setFocalValue;
    this.availableWidth = availableWidth;
    this.scale = new ValuePerPixelScale(1);
    scaleProperty.subscribe((newValue) => {
      this.scale = newValue;
    });
  }
  zoomIn(constraints) {
    const valuePerPixel = this.scale.toValue(1);
    let orderOfMagnitude = Math.floor(Math.log10(valuePerPixel));
    const scaleBase = Math.pow(10, orderOfMagnitude);
    let multiple = Math.floor(valuePerPixel / scaleBase);
    multiple -= 1;
    if (multiple === 0) {
      multiple = 9;
      orderOfMagnitude -= 1;
    }
    const newScale = this.scaleProperty.set(
      new ValuePerPixelScale(multiple * Math.pow(10, orderOfMagnitude))
    );
    if (constraints != null) {
      const { keepValue, at } = constraints;
      this.setFocalValue(() => keepValue - newScale.toValue(at));
    }
  }
  zoomOut(constraints) {
    const valuePerPixel = this.scale.toValue(1);
    let orderOfMagnitude = Math.floor(Math.log10(valuePerPixel));
    const scaleBase = Math.pow(10, orderOfMagnitude);
    let multiple = Math.floor(valuePerPixel / scaleBase);
    multiple += 1;
    if (multiple === 10) {
      multiple = 1;
      orderOfMagnitude += 1;
    }
    const newScale = this.scaleProperty.set(
      new ValuePerPixelScale(multiple * Math.pow(10, orderOfMagnitude))
    );
    if (constraints != null) {
      const { keepValue, at } = constraints;
      this.setFocalValue(() => keepValue - newScale.toValue(at));
    }
  }
  zoomToFit(items = this.items.get(), width = this.availableWidth()) {
    const minimum = this.minimumValue(items);
    const maximum = this.maximumValue(items);
    const span = maximum - minimum;
    if (span === 0) {
      this.scaleProperty.set(new ValuePerPixelScale(1));
      this.setFocalValue(() => minimum);
      return;
    }
    this.scaleProperty.set(new ValuePerPixelScale(span / width));
    const centerValue = this.centerValue();
    this.setFocalValue(() => centerValue);
  }
  scrollToFirst() {
    const minimum = this.minimumValue();
    this.scrollToValue(minimum);
  }
  scrollToValue(value) {
    this.setFocalValue(() => value);
  }
  minimumValue(items = this.items.get()) {
    let minimumValue;
    for (const item of items) {
      if (minimumValue === void 0 || item.value() < minimumValue) {
        minimumValue = item.value();
      }
    }
    if (minimumValue === void 0) {
      minimumValue = 0;
    }
    return minimumValue;
  }
  maximumValue(items = this.items.get()) {
    let maximumValue;
    for (const item of items) {
      if (maximumValue === void 0 || item.value() > maximumValue) {
        maximumValue = item.value();
      }
    }
    if (maximumValue === void 0) {
      maximumValue = 0;
    }
    return maximumValue;
  }
  centerValue(items = this.items.get()) {
    const minimumValue = this.minimumValue(items);
    const maximumValue = this.maximumValue(items);
    return (maximumValue - minimumValue) / 2 + minimumValue;
  }
}
function timelineNavigation(scale, items, focalValue, availableWidth) {
  return new TimelineNavigationSvelteImpl(
    scale,
    items,
    focalValue,
    availableWidth
  );
}
function displayDateValue(value, scale) {
  const date = new Date(value);
  const dateString = date.toLocaleDateString();
  if (scale < 24 * 60 * 60 * 1e3) {
    if (scale < 1e3) {
      return dateString + " " + date.toLocaleTimeString() + " " + date.getMilliseconds() + "ms";
    }
    return dateString + " " + date.toLocaleTimeString();
  }
  return dateString;
}
class DateValueDisplay {
  constructor() {
    __publicField(this, "labelStepValue");
    this.labelStepValue = 1001;
  }
  displayValue(value) {
    return displayDateValue(value, this.labelStepValue);
  }
  getSmallestLabelStepValue(scale) {
    const factors = {
      1e3: [1, 2, 5, 10, 20, 50, 100, 200, 500, 1e3],
      12: [1, 2, 3, 4, 6, 12],
      24: [1, 2, 3, 4, 6, 12, 24],
      60: [1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60],
      365: [1, 2, 73, 365]
    };
    const units = {
      millisecond: 1e3,
      second: 60,
      minute: 60,
      hour: 24,
      day: 365,
      year: 1e3
    };
    const unitMultiples = {
      millisecond: 1,
      second: 1e3,
      minute: 60 * 1e3,
      hour: 60 * 60 * 1e3,
      day: 24 * 60 * 60 * 1e3,
      year: 365 * 24 * 60 * 60 * 1e3
    };
    const minStepWidths = {
      millisecond: 256,
      second: 160,
      minute: 160,
      hour: 160,
      day: 128,
      year: 128
    };
    outer:
      for (const [unit, maximum] of Object.entries(units)) {
        const unitFactors = factors[maximum];
        const unitMultiple = unitMultiples[unit];
        const minStepWidth = minStepWidths[unit];
        const minStepValue = scale.toValue(minStepWidth);
        for (const factor of unitFactors) {
          const total = unitMultiple * factor;
          if (total >= minStepValue) {
            this.labelStepValue = total;
            break outer;
          }
        }
      }
    this.labelStepValue = getSmallestMultipleOf10Above(scale.toValue(128));
    return this.labelStepValue;
  }
  labels(labelCount, labelStepValue, firstLabelValue) {
    if (labelCount < 1 || Number.isNaN(labelCount)) {
      labelCount = 1;
    }
    const values = new Array(Math.ceil(labelCount)).fill(0).map((_, i) => firstLabelValue + i * labelStepValue);
    return values.map((value) => ({ text: this.displayValue(value), value }));
  }
}
function timelineDateValueDisplay() {
  return new DateValueDisplay();
}
const numericValueDisplay = {
  labels(labelCount, labelStepValue, firstLabelValue) {
    if (labelCount < 1 || Number.isNaN(labelCount)) {
      labelCount = 1;
    }
    const values = new Array(Math.ceil(labelCount)).fill(0).map((_, i) => firstLabelValue + i * labelStepValue);
    return values.map((value) => ({ text: this.displayValue(value), value }));
  },
  getSmallestLabelStepValue(scale) {
    const minStepWidth = 64;
    const minStepValue = scale.toValue(minStepWidth);
    return getSmallestMultipleOf10Above(minStepValue);
  },
  displayValue(value) {
    return value.toLocaleString();
  }
};
function getSmallestMultipleOf10Above(minStepValue) {
  const log = Math.floor(Math.log10(minStepValue));
  const orderOfMagnitude = Math.pow(10, log);
  for (const multiple of [1, 2.5, 5]) {
    const option = multiple * orderOfMagnitude;
    if (Math.floor(option) === option && option > minStepValue) {
      return option;
    }
  }
  return orderOfMagnitude * 10;
}
function timelineNumericValueDisplay() {
  return numericValueDisplay;
}
const RulerLabel_svelte_svelte_type_style_lang = "";
function create_fragment$n(ctx) {
  let div;
  let t;
  let div_style_value;
  return {
    c() {
      div = element("div");
      t = text(
        /*text*/
        ctx[0]
      );
      attr(div, "class", "label svelte-1rdsdcl");
      attr(
        div,
        "data-value",
        /*text*/
        ctx[0]
      );
      attr(div, "style", div_style_value = "left: " + /*position*/
      ctx[1] + "px;" + /*style*/
      ctx[2]);
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, t);
    },
    p(ctx2, [dirty]) {
      if (dirty & /*text*/
      1)
        set_data(
          t,
          /*text*/
          ctx2[0]
        );
      if (dirty & /*text*/
      1) {
        attr(
          div,
          "data-value",
          /*text*/
          ctx2[0]
        );
      }
      if (dirty & /*position, style*/
      6 && div_style_value !== (div_style_value = "left: " + /*position*/
      ctx2[1] + "px;" + /*style*/
      ctx2[2])) {
        attr(div, "style", div_style_value);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}
function instance$k($$self, $$props, $$invalidate) {
  let { text: text2 } = $$props;
  let { position } = $$props;
  let { style = "" } = $$props;
  $$self.$$set = ($$props2) => {
    if ("text" in $$props2)
      $$invalidate(0, text2 = $$props2.text);
    if ("position" in $$props2)
      $$invalidate(1, position = $$props2.position);
    if ("style" in $$props2)
      $$invalidate(2, style = $$props2.style);
  };
  return [text2, position, style];
}
class RulerLabel extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$k, create_fragment$n, safe_not_equal, { text: 0, position: 1, style: 2 });
  }
}
const Tooltip = ".tooltip.mod-top {\r\n    transform: translate(-50%, -100%);\r\n    animation: pop-up 200ms forwards ease-in-out;\r\n}\r\n\r\n@keyframes pop-up {\r\n    0% {\r\n        opacity: 0;\r\n        transform: translate(-50%, -100%);\r\n    }\r\n\r\n    20% {\r\n        opacity: 0.7;\r\n        transform: translate(-50%, -100%) sale(1.02);\r\n    }\r\n\r\n    40% {\r\n        opacity: 1;\r\n        transform: translate(-50%, -100%) sale(1.05);\r\n    }\r\n\r\n    100% {\r\n        opacity: 1;\r\n        transform: translate(-50%, -100%) sale(1);\r\n    }\r\n}";
function hoverTooltip(element2, args) {
  const tooltip = document.createElement("div");
  tooltip.className = "tooltip " + args.className;
  tooltip.innerText = args.label;
  const tooltipArrow = document.createElement("div");
  tooltipArrow.className = "tooltip-arrow";
  tooltip.appendChild(tooltipArrow);
  function position({ elementPosition, styles }) {
    const clientBounds = element2.getBoundingClientRect();
    const relativePosition = (elementPosition != null ? elementPosition : hoverTooltip.center)(
      clientBounds
    );
    tooltip.setCssStyles({
      ...styles,
      top: `${relativePosition.y}px`,
      left: `${relativePosition.x}px`
    });
  }
  position(args);
  if (args.hovered) {
    document.body.appendChild(tooltip);
  }
  return {
    destroy() {
      tooltip.remove();
    },
    update(args2) {
      tooltip.innerText = args2.label;
      if (tooltipArrow.parentElement !== tooltip) {
        tooltip.appendChild(tooltipArrow);
      }
      tooltip.className = "tooltip " + args2.className;
      position(args2);
      if (args2.hovered && tooltip.parentElement != document.body) {
        document.body.appendChild(tooltip);
      } else if (!args2.hovered && tooltip.parentElement == document.body) {
        tooltip.remove();
      }
    }
  };
}
hoverTooltip.center = function(rect) {
  return {
    x: rect.x + rect.width / 2,
    y: rect.y + rect.height / 2
  };
};
hoverTooltip.bottom = function(rect) {
  return {
    x: rect.x + rect.width / 2,
    y: rect.bottom
  };
};
hoverTooltip.top = function(rect) {
  return {
    x: rect.x + rect.width / 2,
    y: rect.top
  };
};
hoverTooltip.left = function(rect) {
  return {
    x: rect.left,
    y: rect.y + rect.height / 2
  };
};
hoverTooltip.right = function(rect) {
  return {
    x: rect.right,
    y: rect.y + rect.height / 2
  };
};
hoverTooltip.topLeft = function(rect) {
  return {
    x: rect.left,
    y: rect.top
  };
};
hoverTooltip.topRight = function(rect) {
  return {
    x: rect.right,
    y: rect.top
  };
};
hoverTooltip.bottomLeft = function(rect) {
  return {
    x: rect.left,
    y: rect.bottom
  };
};
hoverTooltip.bottomRight = function(rect) {
  return {
    x: rect.right,
    y: rect.bottom
  };
};
const Playhead_svelte_svelte_type_style_lang = "";
function create_fragment$m(ctx) {
  let div;
  let hoverTooltip_action;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      set_style(
        div,
        "left",
        /*x*/
        ctx[0] + "px"
      );
      attr(div, "class", "svelte-1d9cqje");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (!mounted) {
        dispose = action_destroyer(hoverTooltip_action = hoverTooltip.call(
          null,
          div,
          /*tooltip*/
          ctx[1]
        ));
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & /*x*/
      1) {
        set_style(
          div,
          "left",
          /*x*/
          ctx2[0] + "px"
        );
      }
      if (hoverTooltip_action && is_function(hoverTooltip_action.update) && dirty & /*tooltip*/
      2)
        hoverTooltip_action.update.call(
          null,
          /*tooltip*/
          ctx2[1]
        );
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      mounted = false;
      dispose();
    }
  };
}
function instance$j($$self, $$props, $$invalidate) {
  let { x } = $$props;
  let { label } = $$props;
  let tooltip = {
    label,
    hovered: true,
    className: "mod-top",
    elementPosition: hoverTooltip.top
  };
  $$self.$$set = ($$props2) => {
    if ("x" in $$props2)
      $$invalidate(0, x = $$props2.x);
    if ("label" in $$props2)
      $$invalidate(2, label = $$props2.label);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*x, label*/
    5) {
      $$invalidate(1, tooltip = {
        label,
        hovered: true,
        className: "mod-top",
        elementPosition: hoverTooltip.top
      });
    }
  };
  return [x, tooltip, label];
}
class Playhead extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$j, create_fragment$m, safe_not_equal, { x: 0, label: 2 });
  }
}
const TimelineRuler_svelte_svelte_type_style_lang = "";
function get_each_context$2(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[16] = list[i];
  return child_ctx;
}
function create_if_block$6(ctx) {
  let playhead;
  let current;
  playhead = new Playhead({
    props: {
      x: (
        /*mousePosition*/
        ctx[5].x
      ),
      label: (
        /*mousePosition*/
        ctx[5].value
      )
    }
  });
  return {
    c() {
      create_component(playhead.$$.fragment);
    },
    m(target, anchor) {
      mount_component(playhead, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const playhead_changes = {};
      if (dirty & /*mousePosition*/
      32)
        playhead_changes.x = /*mousePosition*/
        ctx2[5].x;
      if (dirty & /*mousePosition*/
      32)
        playhead_changes.label = /*mousePosition*/
        ctx2[5].value;
      playhead.$set(playhead_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(playhead.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(playhead.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(playhead, detaching);
    }
  };
}
function create_each_block$2(key_1, ctx) {
  let first;
  let rulerlabel;
  let current;
  rulerlabel = new RulerLabel({
    props: {
      text: (
        /*label*/
        ctx[16].text
      ),
      position: (
        /*scale*/
        ctx[1].toPixels(
          /*label*/
          ctx[16].value - /*focalValue*/
          ctx[2]
        ) + /*width*/
        ctx[3] / 2
      )
    }
  });
  return {
    key: key_1,
    first: null,
    c() {
      first = empty();
      create_component(rulerlabel.$$.fragment);
      this.first = first;
    },
    m(target, anchor) {
      insert(target, first, anchor);
      mount_component(rulerlabel, target, anchor);
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      const rulerlabel_changes = {};
      if (dirty & /*labels*/
      64)
        rulerlabel_changes.text = /*label*/
        ctx[16].text;
      if (dirty & /*scale, labels, focalValue, width*/
      78)
        rulerlabel_changes.position = /*scale*/
        ctx[1].toPixels(
          /*label*/
          ctx[16].value - /*focalValue*/
          ctx[2]
        ) + /*width*/
        ctx[3] / 2;
      rulerlabel.$set(rulerlabel_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(rulerlabel.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(rulerlabel.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(first);
      }
      destroy_component(rulerlabel, detaching);
    }
  };
}
function create_fragment$l(ctx) {
  let div;
  let t0;
  let rulerlabel;
  let t1;
  let each_blocks = [];
  let each_1_lookup = /* @__PURE__ */ new Map();
  let div_resize_listener;
  let current;
  let mounted;
  let dispose;
  let if_block = (
    /*mousePosition*/
    ctx[5] != null && create_if_block$6(ctx)
  );
  rulerlabel = new RulerLabel({
    props: {
      text: "1234567890-:/APM",
      position: 0,
      style: "position:relative;visibility:hidden;"
    }
  });
  let each_value = ensure_array_like(
    /*labels*/
    ctx[6]
  );
  const get_key = (ctx2) => (
    /*label*/
    ctx2[16].value
  );
  for (let i = 0; i < each_value.length; i += 1) {
    let child_ctx = get_each_context$2(ctx, each_value, i);
    let key = get_key(child_ctx);
    each_1_lookup.set(key, each_blocks[i] = create_each_block$2(key, child_ctx));
  }
  return {
    c() {
      div = element("div");
      if (if_block)
        if_block.c();
      t0 = space();
      create_component(rulerlabel.$$.fragment);
      t1 = space();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(div, "class", "ruler svelte-ity3s");
      set_style(
        div,
        "--label-width",
        /*labelStepWidth*/
        ctx[4] + "px"
      );
      attr(div, "role", "slider");
      attr(div, "aria-valuemin", Number.NEGATIVE_INFINITY);
      attr(div, "aria-valuemax", Number.POSITIVE_INFINITY);
      attr(
        div,
        "aria-valuenow",
        /*focalValue*/
        ctx[2]
      );
      attr(div, "tabindex", "0");
      add_render_callback(() => (
        /*div_elementresize_handler*/
        ctx[13].call(div)
      ));
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (if_block)
        if_block.m(div, null);
      append(div, t0);
      mount_component(rulerlabel, div, null);
      append(div, t1);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(div, null);
        }
      }
      div_resize_listener = add_iframe_resize_listener(
        div,
        /*div_elementresize_handler*/
        ctx[13].bind(div)
      );
      current = true;
      if (!mounted) {
        dispose = [
          listen(
            div,
            "mousemove",
            /*onMeasureMouseLocation*/
            ctx[7]
          ),
          listen(
            div,
            "mouseleave",
            /*stopMeasureMouseLocation*/
            ctx[8]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (
        /*mousePosition*/
        ctx2[5] != null
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*mousePosition*/
          32) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$6(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div, t0);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
      if (dirty & /*labels, scale, focalValue, width*/
      78) {
        each_value = ensure_array_like(
          /*labels*/
          ctx2[6]
        );
        group_outros();
        each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx2, each_value, each_1_lookup, div, outro_and_destroy_block, create_each_block$2, null, get_each_context$2);
        check_outros();
      }
      if (!current || dirty & /*labelStepWidth*/
      16) {
        set_style(
          div,
          "--label-width",
          /*labelStepWidth*/
          ctx2[4] + "px"
        );
      }
      if (!current || dirty & /*focalValue*/
      4) {
        attr(
          div,
          "aria-valuenow",
          /*focalValue*/
          ctx2[2]
        );
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      transition_in(rulerlabel.$$.fragment, local);
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      transition_out(if_block);
      transition_out(rulerlabel.$$.fragment, local);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (if_block)
        if_block.d();
      destroy_component(rulerlabel);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].d();
      }
      div_resize_listener();
      mounted = false;
      run_all(dispose);
    }
  };
}
function getLabelCount(stepWidth, fullWidth) {
  return Math.ceil(fullWidth / stepWidth) + 1;
}
function instance$i($$self, $$props, $$invalidate) {
  let labelStepValue;
  let labelStepWidth;
  let labelCount;
  let firstLabelValue;
  let labels;
  let { display } = $$props;
  let { scale } = $$props;
  let { focalValue } = $$props;
  let width = 0;
  let { clientHeight: height = 0 } = $$props;
  const dispatch2 = createEventDispatcher();
  function getFirstLabelValue(focalValue2, scale2, labelStepValue2) {
    const valueOnLeftSide = focalValue2 - scale2.toValue(width / 2);
    return Math.floor(valueOnLeftSide / labelStepValue2) * labelStepValue2;
  }
  let mousePosition;
  function onMeasureMouseLocation(event) {
    const x = event.clientX - event.currentTarget.getBoundingClientRect().left;
    const distanceToCenter = width / 2 - x;
    let value = Math.floor(focalValue - scale.toValue(distanceToCenter));
    if (Object.is(value, -0)) {
      value = 0;
    }
    $$invalidate(5, mousePosition = { value: display.displayValue(value), x });
    dispatch2("mouseMeasurement", mousePosition);
  }
  function stopMeasureMouseLocation(event) {
    $$invalidate(5, mousePosition = void 0);
    dispatch2("mouseMeasurement", mousePosition);
  }
  function div_elementresize_handler() {
    width = this.clientWidth;
    height = this.clientHeight;
    $$invalidate(3, width);
    $$invalidate(0, height);
  }
  $$self.$$set = ($$props2) => {
    if ("display" in $$props2)
      $$invalidate(9, display = $$props2.display);
    if ("scale" in $$props2)
      $$invalidate(1, scale = $$props2.scale);
    if ("focalValue" in $$props2)
      $$invalidate(2, focalValue = $$props2.focalValue);
    if ("clientHeight" in $$props2)
      $$invalidate(0, height = $$props2.clientHeight);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*display, scale*/
    514) {
      $$invalidate(11, labelStepValue = display.getSmallestLabelStepValue(scale));
    }
    if ($$self.$$.dirty & /*scale, labelStepValue*/
    2050) {
      $$invalidate(4, labelStepWidth = scale.toPixels(labelStepValue));
    }
    if ($$self.$$.dirty & /*labelStepWidth, width*/
    24) {
      $$invalidate(12, labelCount = getLabelCount(labelStepWidth, width));
    }
    if ($$self.$$.dirty & /*focalValue, scale, labelStepValue*/
    2054) {
      $$invalidate(10, firstLabelValue = getFirstLabelValue(focalValue, scale, labelStepValue));
    }
    if ($$self.$$.dirty & /*display, labelCount, labelStepValue, firstLabelValue*/
    7680) {
      $$invalidate(6, labels = display.labels(labelCount, labelStepValue, firstLabelValue));
    }
  };
  return [
    height,
    scale,
    focalValue,
    width,
    labelStepWidth,
    mousePosition,
    labels,
    onMeasureMouseLocation,
    stopMeasureMouseLocation,
    display,
    firstLabelValue,
    labelStepValue,
    labelCount,
    div_elementresize_handler
  ];
}
class TimelineRuler extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$i, create_fragment$l, safe_not_equal, {
      display: 9,
      scale: 1,
      focalValue: 2,
      clientHeight: 0
    });
  }
}
class TimelineLayoutItem {
  constructor(item, centerX = 0, centerY = 0, radius = 0) {
    this.item = item;
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = radius;
  }
  left() {
    return this.centerX - this.radius;
  }
  right() {
    return this.centerX + this.radius;
  }
  top() {
    return this.centerY - this.radius;
  }
  bottom() {
    return this.centerY + this.radius;
  }
}
class TimelineItemElement {
  constructor(layoutItem, offsetLeft = 0, offsetRight = 0, offsetTop = 0, offsetWidth = 0, offsetHeight = 0, offsetBottom = 0, offsetCenterX = 0, offsetCenterY = 0) {
    this.layoutItem = layoutItem;
    this.offsetLeft = offsetLeft;
    this.offsetRight = offsetRight;
    this.offsetTop = offsetTop;
    this.offsetWidth = offsetWidth;
    this.offsetHeight = offsetHeight;
    this.offsetBottom = offsetBottom;
    this.offsetCenterX = offsetCenterX;
    this.offsetCenterY = offsetCenterY;
  }
  contains(x, y) {
    return this.offsetLeft <= x && x < this.offsetRight && this.offsetTop <= y && y < this.offsetBottom;
  }
  get backgroundColor() {
    return this.layoutItem.item.color();
  }
}
function renderLayout(context, viewport, point, layout) {
  var _a;
  const pointRadius = point.width / 2;
  const PI2 = 2 * Math.PI;
  const renderHeight = viewport.height + point.width;
  const defaultColor = context.fillStyle;
  context.beginPath();
  context.clearRect(0, 0, viewport.width, viewport.height);
  let currentColor = context.fillStyle;
  for (const item of layout) {
    if (item.offsetTop > renderHeight || item.offsetBottom < 0)
      continue;
    const color = (_a = item.backgroundColor) != null ? _a : defaultColor;
    if (color !== currentColor) {
      context.closePath();
      context.fill();
      context.beginPath();
      currentColor = color;
    }
    context.fillStyle = color;
    context.moveTo(item.offsetRight, item.offsetTop);
    context.arc(
      item.offsetCenterX,
      item.offsetCenterY,
      pointRadius,
      0,
      PI2
    );
  }
  context.closePath();
  context.fill();
}
function layoutPoints(viewport, point, scale, sortedItems, previousLayout = []) {
  var _a;
  const pointRadius = Math.floor(point.width / 2);
  const lastXByRow = [];
  let prev;
  if (previousLayout.length > sortedItems.length) {
    previousLayout = previousLayout.slice(0, sortedItems.length);
  }
  for (let i = 0; i < sortedItems.length; i++) {
    const item = sortedItems[i];
    const absolutePixelCenter = scale.toPixels(item.value());
    const relativePixelCenter = absolutePixelCenter;
    const relativeLeftMargin = relativePixelCenter - pointRadius - point.margin.horizontal;
    let row;
    if (relativeLeftMargin === (prev == null ? void 0 : prev.relativeLeftMargin)) {
      row = findNextAvailableRow(
        relativeLeftMargin,
        lastXByRow,
        prev.row
      );
    } else {
      row = findNextAvailableRow(relativeLeftMargin, lastXByRow);
    }
    const layoutItem = (_a = previousLayout[i]) != null ? _a : new TimelineLayoutItem(item);
    layoutItem.item = item;
    layoutItem.centerX = relativePixelCenter;
    layoutItem.centerY = viewport.padding.top + point.margin.vertical + pointRadius + row * (point.width + point.margin.vertical);
    layoutItem.radius = point.width / 2;
    lastXByRow[row] = layoutItem.centerX + layoutItem.radius;
    prev = { relativeLeftMargin, row, value: item.value() };
    previousLayout[i] = layoutItem;
  }
  return previousLayout;
}
function findNextAvailableRow(relativeLeftMargin, lastXByRow, startIndex = 0) {
  for (let rowIndex = startIndex; rowIndex < lastXByRow.length; rowIndex++) {
    const x = lastXByRow[rowIndex];
    if (x < relativeLeftMargin) {
      return rowIndex;
    }
  }
  return lastXByRow.length;
}
const Scrollbar_svelte_svelte_type_style_lang = "";
function create_fragment$k(ctx) {
  let div1;
  let div0;
  let mounted;
  let dispose;
  let div1_levels = [
    /*$$restProps*/
    ctx[12],
    { role: "scrollbar" },
    {
      "aria-orientation": (
        /*orientation*/
        ctx[0]
      )
    },
    { "aria-controls": (
      /*controls*/
      ctx[1]
    ) },
    { "aria-valuenow": (
      /*value*/
      ctx[3]
    ) },
    { "aria-valuemin": (
      /*min*/
      ctx[4]
    ) },
    { "aria-valuemax": (
      /*max*/
      ctx[5]
    ) },
    { tabindex: (
      /*tabindex*/
      ctx[2]
    ) }
  ];
  let div_data_1 = {};
  for (let i = 0; i < div1_levels.length; i += 1) {
    div_data_1 = assign(div_data_1, div1_levels[i]);
  }
  return {
    c() {
      div1 = element("div");
      div0 = element("div");
      attr(div0, "role", "presentation");
      attr(div0, "class", "thumb svelte-1bqbpo3");
      set_style(
        div0,
        "--percent",
        /*percent*/
        ctx[8]
      );
      set_style(
        div0,
        "--value",
        /*percentValue*/
        ctx[9]
      );
      toggle_class(
        div0,
        "dragging",
        /*dragging*/
        ctx[7]
      );
      set_attributes(div1, div_data_1);
      toggle_class(
        div1,
        "unneeded",
        /*percent*/
        ctx[8] >= 0.99999999999
      );
      toggle_class(div1, "svelte-1bqbpo3", true);
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, div0);
      ctx[16](div0);
      if (!mounted) {
        dispose = [
          listen(div0, "mousedown", stop_propagation(
            /*onThumbMouseDown*/
            ctx[10]
          )),
          listen(div1, "mousedown", self(
            /*onBarMouseDown*/
            ctx[11]
          ))
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & /*percent*/
      256) {
        set_style(
          div0,
          "--percent",
          /*percent*/
          ctx2[8]
        );
      }
      if (dirty & /*percentValue*/
      512) {
        set_style(
          div0,
          "--value",
          /*percentValue*/
          ctx2[9]
        );
      }
      if (dirty & /*dragging*/
      128) {
        toggle_class(
          div0,
          "dragging",
          /*dragging*/
          ctx2[7]
        );
      }
      set_attributes(div1, div_data_1 = get_spread_update(div1_levels, [
        dirty & /*$$restProps*/
        4096 && /*$$restProps*/
        ctx2[12],
        { role: "scrollbar" },
        dirty & /*orientation*/
        1 && {
          "aria-orientation": (
            /*orientation*/
            ctx2[0]
          )
        },
        dirty & /*controls*/
        2 && { "aria-controls": (
          /*controls*/
          ctx2[1]
        ) },
        dirty & /*value*/
        8 && { "aria-valuenow": (
          /*value*/
          ctx2[3]
        ) },
        dirty & /*min*/
        16 && { "aria-valuemin": (
          /*min*/
          ctx2[4]
        ) },
        dirty & /*max*/
        32 && { "aria-valuemax": (
          /*max*/
          ctx2[5]
        ) },
        dirty & /*tabindex*/
        4 && { tabindex: (
          /*tabindex*/
          ctx2[2]
        ) }
      ]));
      toggle_class(
        div1,
        "unneeded",
        /*percent*/
        ctx2[8] >= 0.99999999999
      );
      toggle_class(div1, "svelte-1bqbpo3", true);
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div1);
      }
      ctx[16](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$h($$self, $$props, $$invalidate) {
  let span;
  let percent;
  let scrollSpan;
  let percentValue;
  const omit_props_names = ["orientation", "controls", "tabindex", "value", "visibleAmount", "min", "max"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  const dispatch2 = createEventDispatcher();
  let { orientation = "vertical" } = $$props;
  let { controls } = $$props;
  let { tabindex } = $$props;
  let { value } = $$props;
  let { visibleAmount } = $$props;
  let { min = 0 } = $$props;
  let { max = 100 } = $$props;
  let thumb;
  let dragging = false;
  function onThumbMouseDown(e) {
    const startScreenX = e.screenX;
    const startScreenY = e.screenY;
    const startValue = value;
    const startPercent = percent;
    const startMin = min;
    const startMax = max;
    let lastScreenX = e.screenX;
    let lastScreenY = e.screenY;
    function mouseMoveListener(e2) {
      if (!dragging) {
        $$invalidate(7, dragging = true);
        dispatch2("dragstart");
      }
      const deltaScreenX = e2.screenX - lastScreenX;
      const deltaScreenY = e2.screenY - lastScreenY;
      lastScreenX = e2.screenX;
      lastScreenY = e2.screenY;
      const deltaXSinceStart = e2.screenX - startScreenX;
      const deltaYSinceStart = e2.screenY - startScreenY;
      let deltaPixels = 0;
      let deltaPixelsSinceStart = 0;
      if (orientation === "horizontal") {
        deltaPixels = deltaScreenX;
        deltaPixelsSinceStart = deltaXSinceStart;
      } else {
        deltaPixels = deltaScreenY;
        deltaPixelsSinceStart = deltaYSinceStart;
      }
      const deltaValue = deltaPixels / startPercent;
      const deltaValueSinceStart = deltaPixelsSinceStart / startPercent;
      const newValue = Math.max(startMin, Math.min(startMax, startValue + deltaValueSinceStart));
      dispatch2("change", {
        dragging: true,
        deltaPixels,
        deltaPixelsSinceStart,
        deltaValue,
        deltaValueSinceStart,
        value: newValue,
        ratio: startPercent,
        startValue
      });
    }
    function mouseUpListener(e2) {
      if (dragging) {
        $$invalidate(7, dragging = false);
        dispatch2("dragend");
      }
      window.removeEventListener("mousemove", mouseMoveListener);
      window.removeEventListener("mouseup", mouseUpListener);
    }
    window.addEventListener("mousemove", mouseMoveListener);
    window.addEventListener("mouseup", mouseUpListener);
  }
  function onBarMouseDown(e) {
    const startX = e.offsetX;
    const startY = e.offsetY;
    const direction = (orientation === "horizontal" ? e.offsetX < thumb.offsetLeft : e.offsetY < thumb.offsetTop) ? -1 : 1;
    function incrementValue() {
      if (orientation === "horizontal") {
        if (thumb.offsetLeft <= startX && thumb.offsetLeft + thumb.offsetWidth >= startX) {
          return;
        }
      } else {
        if (thumb.offsetTop <= startY && thumb.offsetTop + thumb.offsetHeight >= startY) {
          return;
        }
      }
      let deltaValue = direction * visibleAmount;
      const targetValue = value + deltaValue;
      const newValue = Math.max(min, Math.min(max, targetValue));
      if (newValue !== targetValue) {
        deltaValue = newValue - value;
      }
      const deltaPixels = deltaValue * percent;
      dispatch2("change", {
        dragging: false,
        value: newValue,
        deltaValue,
        deltaPixels,
        ratio: percent
      });
    }
    incrementValue();
    const interval = setInterval(incrementValue, 50);
    function mouseUpListener() {
      clearInterval(interval);
      window.removeEventListener("mouseup", mouseUpListener);
    }
    window.addEventListener("mouseup", mouseUpListener);
  }
  function div0_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      thumb = $$value;
      $$invalidate(6, thumb);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(12, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("orientation" in $$new_props)
      $$invalidate(0, orientation = $$new_props.orientation);
    if ("controls" in $$new_props)
      $$invalidate(1, controls = $$new_props.controls);
    if ("tabindex" in $$new_props)
      $$invalidate(2, tabindex = $$new_props.tabindex);
    if ("value" in $$new_props)
      $$invalidate(3, value = $$new_props.value);
    if ("visibleAmount" in $$new_props)
      $$invalidate(13, visibleAmount = $$new_props.visibleAmount);
    if ("min" in $$new_props)
      $$invalidate(4, min = $$new_props.min);
    if ("max" in $$new_props)
      $$invalidate(5, max = $$new_props.max);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*max, min*/
    48) {
      $$invalidate(15, span = max - min);
    }
    if ($$self.$$.dirty & /*span, visibleAmount*/
    40960) {
      $$invalidate(8, percent = span === 0 ? 1 : visibleAmount / span);
    }
    if ($$self.$$.dirty & /*span, visibleAmount*/
    40960) {
      $$invalidate(14, scrollSpan = Math.max(0, span - visibleAmount));
    }
    if ($$self.$$.dirty & /*scrollSpan, value, min*/
    16408) {
      $$invalidate(9, percentValue = scrollSpan === 0 ? 0 : (value - min) / scrollSpan);
    }
  };
  return [
    orientation,
    controls,
    tabindex,
    value,
    min,
    max,
    thumb,
    dragging,
    percent,
    percentValue,
    onThumbMouseDown,
    onBarMouseDown,
    $$restProps,
    visibleAmount,
    scrollSpan,
    span,
    div0_binding
  ];
}
class Scrollbar extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$h, create_fragment$k, safe_not_equal, {
      orientation: 0,
      controls: 1,
      tabindex: 2,
      value: 3,
      visibleAmount: 13,
      min: 4,
      max: 5
    });
  }
}
function cubicOut(t) {
  const f = t - 1;
  return f * f * f + 1;
}
function quintOut(t) {
  return --t * t * t * t * t + 1;
}
function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
  const o = +getComputedStyle(node).opacity;
  return {
    delay,
    duration,
    easing,
    css: (t) => `opacity: ${t * o}`
  };
}
function slide(node, { delay = 0, duration = 400, easing = cubicOut, axis = "y" } = {}) {
  const style = getComputedStyle(node);
  const opacity = +style.opacity;
  const primary_property = axis === "y" ? "height" : "width";
  const primary_property_value = parseFloat(style[primary_property]);
  const secondary_properties = axis === "y" ? ["top", "bottom"] : ["left", "right"];
  const capitalized_secondary_properties = secondary_properties.map(
    (e) => `${e[0].toUpperCase()}${e.slice(1)}`
  );
  const padding_start_value = parseFloat(style[`padding${capitalized_secondary_properties[0]}`]);
  const padding_end_value = parseFloat(style[`padding${capitalized_secondary_properties[1]}`]);
  const margin_start_value = parseFloat(style[`margin${capitalized_secondary_properties[0]}`]);
  const margin_end_value = parseFloat(style[`margin${capitalized_secondary_properties[1]}`]);
  const border_width_start_value = parseFloat(
    style[`border${capitalized_secondary_properties[0]}Width`]
  );
  const border_width_end_value = parseFloat(
    style[`border${capitalized_secondary_properties[1]}Width`]
  );
  return {
    delay,
    duration,
    easing,
    css: (t) => `overflow: hidden;opacity: ${Math.min(t * 20, 1) * opacity};${primary_property}: ${t * primary_property_value}px;padding-${secondary_properties[0]}: ${t * padding_start_value}px;padding-${secondary_properties[1]}: ${t * padding_end_value}px;margin-${secondary_properties[0]}: ${t * margin_start_value}px;margin-${secondary_properties[1]}: ${t * margin_end_value}px;border-${secondary_properties[0]}-width: ${t * border_width_start_value}px;border-${secondary_properties[1]}-width: ${t * border_width_end_value}px;`
  };
}
const Hover_svelte_svelte_type_style_lang = "";
function create_fragment$j(ctx) {
  let div;
  let hoverTooltip_action;
  let div_transition;
  let style_top = `${/*hover*/
  ctx[0].element.offsetTop}px`;
  let style_left = `${/*hover*/
  ctx[0].element.offsetLeft}px`;
  let current;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      attr(div, "class", "timeline-item hover svelte-oanm08");
      attr(
        div,
        "aria-label",
        /*label*/
        ctx[2]
      );
      set_style(div, "top", style_top);
      set_style(div, "left", style_left);
    },
    m(target, anchor) {
      insert(target, div, anchor);
      current = true;
      if (!mounted) {
        dispose = [
          action_destroyer(hoverTooltip_action = hoverTooltip.call(null, div, {
            hovered: (
              /*hovered*/
              ctx[1]
            ),
            label: (
              /*label*/
              ctx[2]
            ),
            className: "timeline-item-tooltip"
          })),
          listen(
            div,
            "introend",
            /*introend_handler*/
            ctx[4]
          ),
          listen(
            div,
            "outrostart",
            /*outrostart_handler*/
            ctx[5]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (!current || dirty & /*label*/
      4) {
        attr(
          div,
          "aria-label",
          /*label*/
          ctx2[2]
        );
      }
      if (hoverTooltip_action && is_function(hoverTooltip_action.update) && dirty & /*hovered, label*/
      6)
        hoverTooltip_action.update.call(null, {
          hovered: (
            /*hovered*/
            ctx2[1]
          ),
          label: (
            /*label*/
            ctx2[2]
          ),
          className: "timeline-item-tooltip"
        });
      if (dirty & /*hover*/
      1 && style_top !== (style_top = `${/*hover*/
      ctx2[0].element.offsetTop}px`)) {
        set_style(div, "top", style_top);
      }
      if (dirty & /*hover*/
      1 && style_left !== (style_left = `${/*hover*/
      ctx2[0].element.offsetLeft}px`)) {
        set_style(div, "left", style_left);
      }
    },
    i(local) {
      if (current)
        return;
      if (local) {
        add_render_callback(() => {
          if (!current)
            return;
          if (!div_transition)
            div_transition = create_bidirectional_transition(div, fade, { duration: 500 }, true);
          div_transition.run(1);
        });
      }
      current = true;
    },
    o(local) {
      if (local) {
        if (!div_transition)
          div_transition = create_bidirectional_transition(div, fade, { duration: 500 }, false);
        div_transition.run(0);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (detaching && div_transition)
        div_transition.end();
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$g($$self, $$props, $$invalidate) {
  let label;
  let { hover } = $$props;
  let { display } = $$props;
  let hovered = false;
  const introend_handler = () => $$invalidate(1, hovered = true);
  const outrostart_handler = () => $$invalidate(1, hovered = false);
  $$self.$$set = ($$props2) => {
    if ("hover" in $$props2)
      $$invalidate(0, hover = $$props2.hover);
    if ("display" in $$props2)
      $$invalidate(3, display = $$props2.display);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*hover, display*/
    9) {
      $$invalidate(2, label = `${hover.element.layoutItem.item.name()}: ${display.displayValue(hover.element.layoutItem.item.value())}`);
    }
  };
  return [hover, hovered, label, display, introend_handler, outrostart_handler];
}
class Hover extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$g, create_fragment$j, safe_not_equal, { hover: 0, display: 3 });
  }
}
const FocusedItem_svelte_svelte_type_style_lang = "";
function create_fragment$i(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      attr(div, "class", "timeline-item focus svelte-d55p53");
      set_style(
        div,
        "top",
        /*focus*/
        ctx[0].offsetTop + "px"
      );
      set_style(
        div,
        "left",
        /*focus*/
        ctx[0].offsetLeft + "px"
      );
    },
    m(target, anchor) {
      insert(target, div, anchor);
    },
    p(ctx2, [dirty]) {
      if (dirty & /*focus*/
      1) {
        set_style(
          div,
          "top",
          /*focus*/
          ctx2[0].offsetTop + "px"
        );
      }
      if (dirty & /*focus*/
      1) {
        set_style(
          div,
          "left",
          /*focus*/
          ctx2[0].offsetLeft + "px"
        );
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}
function instance$f($$self, $$props, $$invalidate) {
  let { focus } = $$props;
  $$self.$$set = ($$props2) => {
    if ("focus" in $$props2)
      $$invalidate(0, focus = $$props2.focus);
  };
  return [focus];
}
class FocusedItem extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$f, create_fragment$i, safe_not_equal, { focus: 0 });
  }
}
const CanvasStage_svelte_svelte_type_style_lang = "";
function create_if_block_1$2(ctx) {
  let hover_1;
  let current;
  hover_1 = new Hover({
    props: {
      hover: (
        /*hover*/
        ctx[17]
      ),
      display: (
        /*display*/
        ctx[0]
      )
    }
  });
  return {
    c() {
      create_component(hover_1.$$.fragment);
    },
    m(target, anchor) {
      mount_component(hover_1, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const hover_1_changes = {};
      if (dirty[0] & /*hover*/
      131072)
        hover_1_changes.hover = /*hover*/
        ctx2[17];
      if (dirty[0] & /*display*/
      1)
        hover_1_changes.display = /*display*/
        ctx2[0];
      hover_1.$set(hover_1_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(hover_1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(hover_1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(hover_1, detaching);
    }
  };
}
function create_if_block$5(ctx) {
  let focuseditem;
  let current;
  focuseditem = new FocusedItem({
    props: { focus: (
      /*focus*/
      ctx[18].element
    ) }
  });
  return {
    c() {
      create_component(focuseditem.$$.fragment);
    },
    m(target, anchor) {
      mount_component(focuseditem, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const focuseditem_changes = {};
      if (dirty[0] & /*focus*/
      262144)
        focuseditem_changes.focus = /*focus*/
        ctx2[18].element;
      focuseditem.$set(focuseditem_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(focuseditem.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(focuseditem.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(focuseditem, detaching);
    }
  };
}
function create_fragment$h(ctx) {
  let div5;
  let div2;
  let div0;
  let t0;
  let div1;
  let t1;
  let div3;
  let t2;
  let div4;
  let div4_resize_listener;
  let t3;
  let canvas_1;
  let t4;
  let t5;
  let t6;
  let scrollbar0;
  let t7;
  let scrollbar1;
  let t8;
  let div6;
  let div6_resize_listener;
  let current;
  let mounted;
  let dispose;
  let if_block0 = (
    /*hover*/
    ctx[17] != null && create_if_block_1$2(ctx)
  );
  let if_block1 = (
    /*focus*/
    ctx[18] != null && create_if_block$5(ctx)
  );
  scrollbar0 = new Scrollbar({
    props: {
      style: `height: ${/*scrollbarHeight*/
      ctx[9]}px;`,
      orientation: "horizontal",
      controls: "stage",
      tabindex: (
        /*sortedItems*/
        ctx[1].length
      ),
      value: (
        /*hScrollValue*/
        ctx[22]
      ),
      visibleAmount: (
        /*visibleHAmount*/
        ctx[23]
      ),
      min: (
        /*minHScrollValue*/
        ctx[24]
      ),
      max: (
        /*maxHScrollValue*/
        ctx[25]
      )
    }
  });
  scrollbar0.$on(
    "change",
    /*handleHScroll*/
    ctx[31]
  );
  scrollbar0.$on(
    "dragstart",
    /*dragstart_handler*/
    ctx[47]
  );
  scrollbar0.$on(
    "dragend",
    /*dragend_handler*/
    ctx[48]
  );
  scrollbar1 = new Scrollbar({
    props: {
      style: `width: ${/*scrollbarWidth*/
      ctx[10]}px;`,
      orientation: "vertical",
      controls: "stage",
      tabindex: (
        /*sortedItems*/
        ctx[1].length + 1
      ),
      value: (
        /*scrollTop*/
        ctx[4]
      ),
      visibleAmount: (
        /*visibleVAmount*/
        ctx[21]
      ),
      min: 0,
      max: (
        /*scrollHeight*/
        ctx[20]
      )
    }
  });
  scrollbar1.$on(
    "change",
    /*handleVScroll*/
    ctx[32]
  );
  scrollbar1.$on(
    "dragstart",
    /*dragstart_handler_1*/
    ctx[49]
  );
  scrollbar1.$on(
    "dragend",
    /*dragend_handler_1*/
    ctx[50]
  );
  return {
    c() {
      div5 = element("div");
      div2 = element("div");
      div0 = element("div");
      t0 = space();
      div1 = element("div");
      t1 = space();
      div3 = element("div");
      t2 = space();
      div4 = element("div");
      t3 = space();
      canvas_1 = element("canvas");
      t4 = space();
      if (if_block0)
        if_block0.c();
      t5 = space();
      if (if_block1)
        if_block1.c();
      t6 = space();
      create_component(scrollbar0.$$.fragment);
      t7 = space();
      create_component(scrollbar1.$$.fragment);
      t8 = space();
      div6 = element("div");
      attr(div0, "class", "timeline-item svelte-gpaskc");
      attr(div1, "class", "timeline-item svelte-gpaskc");
      set_style(div2, "display", "flex");
      set_style(div2, "flex-direction", "row");
      attr(div3, "class", "timeline-item svelte-gpaskc");
      attr(div4, "class", "bottom-right-padding-measure svelte-gpaskc");
      add_render_callback(() => (
        /*div4_elementresize_handler*/
        ctx[42].call(div4)
      ));
      attr(canvas_1, "tabindex", 0);
      attr(canvas_1, "class", "svelte-gpaskc");
      attr(div5, "id", "stage");
      attr(div5, "class", "svelte-gpaskc");
      toggle_class(
        div5,
        "has-hover",
        /*hover*/
        ctx[17] != null
      );
      attr(div6, "class", "scrollbar-style-measurer svelte-gpaskc");
      add_render_callback(() => (
        /*div6_elementresize_handler*/
        ctx[52].call(div6)
      ));
    },
    m(target, anchor) {
      insert(target, div5, anchor);
      append(div5, div2);
      append(div2, div0);
      ctx[39](div0);
      append(div2, t0);
      append(div2, div1);
      ctx[40](div1);
      append(div5, t1);
      append(div5, div3);
      ctx[41](div3);
      append(div5, t2);
      append(div5, div4);
      div4_resize_listener = add_iframe_resize_listener(
        div4,
        /*div4_elementresize_handler*/
        ctx[42].bind(div4)
      );
      append(div5, t3);
      append(div5, canvas_1);
      ctx[43](canvas_1);
      append(div5, t4);
      if (if_block0)
        if_block0.m(div5, null);
      append(div5, t5);
      if (if_block1)
        if_block1.m(div5, null);
      append(div5, t6);
      mount_component(scrollbar0, div5, null);
      append(div5, t7);
      mount_component(scrollbar1, div5, null);
      ctx[51](div5);
      insert(target, t8, anchor);
      insert(target, div6, anchor);
      div6_resize_listener = add_iframe_resize_listener(
        div6,
        /*div6_elementresize_handler*/
        ctx[52].bind(div6)
      );
      current = true;
      if (!mounted) {
        dispose = [
          listen(canvas_1, "wheel", stop_propagation(
            /*handleScroll*/
            ctx[27]
          ), true),
          listen(
            canvas_1,
            "mouseleave",
            /*mouseleave_handler*/
            ctx[44]
          ),
          listen(
            canvas_1,
            "mousemove",
            /*detectHover*/
            ctx[30]
          ),
          listen(
            canvas_1,
            "mousedown",
            /*handleClick*/
            ctx[28]
          ),
          listen(
            canvas_1,
            "focus",
            /*focus_handler*/
            ctx[45]
          ),
          listen(
            canvas_1,
            "keydown",
            /*keydown_handler*/
            ctx[46]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (
        /*hover*/
        ctx2[17] != null
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
          if (dirty[0] & /*hover*/
          131072) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_1$2(ctx2);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(div5, t5);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }
      if (
        /*focus*/
        ctx2[18] != null
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty[0] & /*focus*/
          262144) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block$5(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(div5, t6);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
      const scrollbar0_changes = {};
      if (dirty[0] & /*scrollbarHeight*/
      512)
        scrollbar0_changes.style = `height: ${/*scrollbarHeight*/
        ctx2[9]}px;`;
      if (dirty[0] & /*sortedItems*/
      2)
        scrollbar0_changes.tabindex = /*sortedItems*/
        ctx2[1].length;
      if (dirty[0] & /*hScrollValue*/
      4194304)
        scrollbar0_changes.value = /*hScrollValue*/
        ctx2[22];
      if (dirty[0] & /*visibleHAmount*/
      8388608)
        scrollbar0_changes.visibleAmount = /*visibleHAmount*/
        ctx2[23];
      if (dirty[0] & /*minHScrollValue*/
      16777216)
        scrollbar0_changes.min = /*minHScrollValue*/
        ctx2[24];
      if (dirty[0] & /*maxHScrollValue*/
      33554432)
        scrollbar0_changes.max = /*maxHScrollValue*/
        ctx2[25];
      scrollbar0.$set(scrollbar0_changes);
      const scrollbar1_changes = {};
      if (dirty[0] & /*scrollbarWidth*/
      1024)
        scrollbar1_changes.style = `width: ${/*scrollbarWidth*/
        ctx2[10]}px;`;
      if (dirty[0] & /*sortedItems*/
      2)
        scrollbar1_changes.tabindex = /*sortedItems*/
        ctx2[1].length + 1;
      if (dirty[0] & /*scrollTop*/
      16)
        scrollbar1_changes.value = /*scrollTop*/
        ctx2[4];
      if (dirty[0] & /*visibleVAmount*/
      2097152)
        scrollbar1_changes.visibleAmount = /*visibleVAmount*/
        ctx2[21];
      if (dirty[0] & /*scrollHeight*/
      1048576)
        scrollbar1_changes.max = /*scrollHeight*/
        ctx2[20];
      scrollbar1.$set(scrollbar1_changes);
      if (!current || dirty[0] & /*hover*/
      131072) {
        toggle_class(
          div5,
          "has-hover",
          /*hover*/
          ctx2[17] != null
        );
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block0);
      transition_in(if_block1);
      transition_in(scrollbar0.$$.fragment, local);
      transition_in(scrollbar1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      transition_out(if_block1);
      transition_out(scrollbar0.$$.fragment, local);
      transition_out(scrollbar1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div5);
        detach(t8);
        detach(div6);
      }
      ctx[39](null);
      ctx[40](null);
      ctx[41](null);
      div4_resize_listener();
      ctx[43](null);
      if (if_block0)
        if_block0.d();
      if (if_block1)
        if_block1.d();
      destroy_component(scrollbar0);
      destroy_component(scrollbar1);
      ctx[51](null);
      div6_resize_listener();
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$e($$self, $$props, $$invalidate) {
  let scrollbarWidth;
  let scrollbarHeight;
  const dispatch2 = createEventDispatcher();
  let { display } = $$props;
  let { sortedItems } = $$props;
  let { scale } = $$props;
  let { focalValue } = $$props;
  let { width = 0 } = $$props;
  let { clientWidth = 0 } = $$props;
  let { clientHeight = 0 } = $$props;
  let canvas;
  const pointElements = [void 0, void 0, void 0];
  let stageCSSTarget;
  let innerWidth = 0;
  let innerHeight = 0;
  const viewport = {
    width: 0,
    height: 0,
    padding: { top: 0, right: 0, bottom: 0, left: 0 }
  };
  let pointStyle;
  const item = {
    width: 0,
    height: 0,
    margin: { horizontal: 0, vertical: 0 }
  };
  let layoutNeeded = true;
  let scrollNeeded = true;
  let redrawNeeded = true;
  const resizeObserver = new ResizeObserver((a) => {
    if (canvas == null || pointElements.some((el) => el == null) || stageCSSTarget == null) {
      return;
    }
    if (stageCSSTarget.offsetHeight === 0 && stageCSSTarget.offsetWidth === 0) {
      return;
    }
    item.width = pointElements[0].clientWidth;
    item.height = pointElements[0].clientHeight;
    item.margin.horizontal = Math.max(0, pointElements[1].offsetLeft - (pointElements[0].offsetLeft + item.width));
    item.margin.vertical = Math.max(0, pointElements[2].offsetTop - (pointElements[0].offsetTop + item.height));
    $$invalidate(3, viewport.padding.top = Math.max(0, pointElements[0].offsetTop - item.margin.vertical), viewport), $$invalidate(3, viewport.padding.left = Math.max(0, pointElements[0].offsetLeft - item.margin.horizontal), viewport), $$invalidate(3, viewport.padding.right = stageCSSTarget.clientWidth - viewport.padding.left - innerWidth, viewport), $$invalidate(3, viewport.padding.bottom = stageCSSTarget.clientHeight - viewport.padding.top - innerHeight, viewport), $$invalidate(3, viewport.width = stageCSSTarget.clientWidth, viewport);
    $$invalidate(3, viewport.height = stageCSSTarget.clientHeight, viewport);
    const reportedWidth = viewport.width - viewport.padding.left - viewport.padding.right - item.width - item.margin.horizontal;
    if (width != reportedWidth) {
      $$invalidate(33, width = reportedWidth);
    }
    layoutNeeded = true;
  });
  function handleScroll(event) {
    if (event.shiftKey) {
      dispatch2("scrollX", scale.toValue(event.deltaY));
    } else if (event.ctrlKey) {
      const xRelativeToMiddle = event.offsetX - viewport.width / 2;
      const zoomFocusValue = focalValue + scale.toValue(xRelativeToMiddle);
      if (event.deltaY > 0) {
        dispatch2(`zoomOut`, {
          keepValue: zoomFocusValue,
          at: xRelativeToMiddle,
          within: viewport.width
        });
      } else if (event.deltaY < 0) {
        dispatch2(`zoomIn`, {
          keepValue: zoomFocusValue,
          at: xRelativeToMiddle,
          within: viewport.width
        });
      }
    } else {
      const newScroll = Math.max(0, scrollTop + event.deltaY);
      if (scrollTop != newScroll) {
        $$invalidate(4, scrollTop = newScroll);
        scrollNeeded = true;
      }
    }
  }
  let focusCausedByClick = false;
  function handleClick(event) {
    $$invalidate(16, focusCausedByClick = true);
    if (hover == null || hover.element == null) {
      $$invalidate(18, focus = null);
      return;
    }
    if (event.button === 2) {
      focusOn(hover.element, elements.indexOf(hover.element));
      return;
    }
    $$invalidate(18, focus = null);
    const hoveredItem = hover.element.layoutItem.item;
    $$invalidate(17, hover = null);
    dispatch2("select", { item: hoveredItem, causedBy: event });
  }
  let elements = [];
  let hover = null;
  let focus = null;
  function verticalScrollToFocusItem(element2) {
    if (element2.offsetTop < 0) {
      $$invalidate(4, scrollTop = element2.layoutItem.top());
      scrollNeeded = true;
    } else if (element2.offsetBottom > viewport.height) {
      $$invalidate(4, scrollTop = element2.layoutItem.bottom() - viewport.height);
      scrollNeeded = true;
    }
  }
  function focusOn(element2, index, skipEvent = false) {
    if (!skipEvent) {
      dispatch2("focus", element2.layoutItem.item);
    }
    $$invalidate(18, focus = { element: element2, index });
    redrawNeeded = true;
    verticalScrollToFocusItem(element2);
    if (focus.element.offsetLeft < 0) {
      console.log("centering focused item", { offsetLeft: focus.element.offsetLeft });
      dispatch2("scrollToValue", focus.element.layoutItem.item.value());
    } else if (focus.element.offsetRight > viewport.width) {
      console.log("centering focused item", {
        offsetRigth: focus.element.offsetRight,
        width: viewport.width
      });
      dispatch2("scrollToValue", focus.element.layoutItem.item.value());
    }
  }
  function focusNextItem(back = false) {
    const index = focus == null ? 0 : back ? focus.index - 1 : focus.index + 1;
    if (index < elements.length && index >= 0) {
      focusOn(elements[index], index);
      return true;
    } else {
      $$invalidate(18, focus = null);
      return false;
    }
  }
  function focusOnItem(item2) {
    const index = elements.findIndex((element2) => element2.layoutItem.item === item2);
    if (index >= 0) {
      focusOn(elements[index], index, true);
    }
  }
  let scrollbarDragging = false;
  function detectHover(event) {
    if (!scrollbarDragging) {
      for (let i = 0; i < elements.length; i++) {
        const element2 = elements[i];
        if (element2.contains(event.offsetX, event.offsetY)) {
          $$invalidate(17, hover = {
            element: element2,
            pos: [event.offsetX, event.offsetY]
          });
          return;
        }
      }
    }
    $$invalidate(17, hover = null);
  }
  function onPointsOrScaleChanged(points, scale2) {
    if (focus) {
      const index = points.findIndex((item2) => item2 === focus.element.layoutItem.item);
      if (index >= 0) {
        $$invalidate(18, focus = { index, element: elements[index] });
      } else {
        $$invalidate(18, focus = null);
      }
    }
    layoutNeeded = true;
  }
  function onFocalValueChanged(_) {
    scrollNeeded = true;
  }
  function invalidateColors() {
    redrawNeeded = true;
  }
  let scrollTop = 0;
  function onScrollTopChanged(_) {
    scrollNeeded = true;
  }
  let scrollHeight = 0;
  let visibleVAmount = 0;
  let scrollbarMeasurerFullWidth = 0;
  let scrollbarMeasurerInnerWidth = 0;
  let scrollbarMeasurerFullHeight = 0;
  let scrollbarMeasurerInnerHeight = 0;
  let hScrollValue = 0;
  let visibleHAmount = viewport.width;
  let minHScrollValue = 0;
  let maxHScrollValue = 0;
  function handleHScroll(event) {
    dispatch2("scrollToValue", focalValue + scale.toValue(event.detail.deltaPixels) / event.detail.ratio);
  }
  function handleVScroll(event) {
    $$invalidate(4, scrollTop = event.detail.value);
  }
  onMount(() => {
    if (canvas == null || pointElements.some((el) => el == null) || stageCSSTarget == null) {
      return;
    }
    resizeObserver.observe(canvas);
    resizeObserver.observe(pointElements[0]);
    resizeObserver.observe(stageCSSTarget);
    pointStyle = getComputedStyle(pointElements[0]);
    function draw(layout = []) {
      var _a, _b, _c, _d, _e;
      if (canvas == null)
        return;
      if (canvas.width != viewport.width)
        $$invalidate(11, canvas.width = viewport.width, canvas);
      if (canvas.height != viewport.height)
        $$invalidate(11, canvas.height = viewport.height, canvas);
      const renderContext = canvas.getContext("2d");
      if (renderContext == null)
        return;
      if (layoutNeeded) {
        layout = layoutPoints(viewport, item, scale, sortedItems, layout);
        if (layout.length > 0) {
          $$invalidate(20, scrollHeight = 0);
          for (const bounds of layout) {
            $$invalidate(20, scrollHeight = Math.max(scrollHeight, bounds.bottom() + item.margin.vertical + viewport.padding.bottom));
          }
        } else {
          $$invalidate(20, scrollHeight = 0);
        }
        if (focus != null) {
          if (focus.index > layout.length) {
            $$invalidate(18, focus = null);
          }
        }
      }
      if (scrollNeeded || layoutNeeded) {
        if (elements.length > layout.length) {
          elements = elements.slice(0, layout.length);
        }
        const scrollLeft = scale.toPixels(focalValue) - viewport.width / 2;
        $$invalidate(4, scrollTop = Math.max(0, Math.min(scrollTop, scrollHeight - viewport.height)));
        $$invalidate(21, visibleVAmount = viewport.height);
        for (let i = 0; i < layout.length; i++) {
          const item2 = layout[i];
          const element2 = (_a = elements[i]) != null ? _a : new TimelineItemElement(item2);
          element2.layoutItem = item2;
          element2.offsetCenterX = item2.centerX - scrollLeft;
          element2.offsetCenterY = item2.centerY - scrollTop;
          element2.offsetLeft = element2.offsetCenterX - item2.radius;
          element2.offsetTop = element2.offsetCenterY - item2.radius;
          element2.offsetWidth = item2.radius * 2;
          element2.offsetHeight = item2.radius * 2;
          element2.offsetRight = element2.offsetLeft + element2.offsetWidth;
          element2.offsetBottom = element2.offsetTop + element2.offsetHeight;
          elements[i] = element2;
        }
        $$invalidate(23, visibleHAmount = scale.toValue(viewport.width));
        $$invalidate(22, hScrollValue = focalValue - scale.toValue(viewport.width / 2));
        const leftMostValue = ((_c = (_b = sortedItems[0]) == null ? void 0 : _b.value()) != null ? _c : 0) - scale.toValue(viewport.padding.left + item.width / 2);
        const rightMostValue = ((_e = (_d = sortedItems[sortedItems.length - 1]) == null ? void 0 : _d.value()) != null ? _e : 0) - scale.toValue(viewport.padding.left + item.width / 2);
        $$invalidate(24, minHScrollValue = Math.min(focalValue - scale.toValue(viewport.width / 2), leftMostValue));
        $$invalidate(25, maxHScrollValue = Math.max(focalValue + scale.toValue(viewport.width / 2), rightMostValue));
        if (hover != null) {
          detectHover({
            offsetX: hover.pos[0],
            offsetY: hover.pos[1]
          });
        }
        if (focus) {
          $$invalidate(18, focus.element = elements[focus.index], focus);
          if (!focus.element) {
            $$invalidate(18, focus = null);
          } else {
            if (layoutNeeded) {
              verticalScrollToFocusItem(focus.element);
            }
            $$invalidate(18, focus);
          }
        }
      }
      if (redrawNeeded || scrollNeeded || layoutNeeded) {
        renderContext.fillStyle = pointStyle.backgroundColor;
        renderLayout(renderContext, viewport, item, elements);
      }
      layoutNeeded = false;
      scrollNeeded = false;
      redrawNeeded = false;
      requestAnimationFrame(() => draw(layout));
    }
    requestAnimationFrame(() => draw());
  });
  function div0_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      pointElements[0] = $$value;
      $$invalidate(12, pointElements);
    });
  }
  function div1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      pointElements[1] = $$value;
      $$invalidate(12, pointElements);
    });
  }
  function div3_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      pointElements[2] = $$value;
      $$invalidate(12, pointElements);
    });
  }
  function div4_elementresize_handler() {
    innerWidth = this.offsetWidth;
    innerHeight = this.offsetHeight;
    $$invalidate(14, innerWidth);
    $$invalidate(15, innerHeight);
  }
  function canvas_1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      canvas = $$value;
      $$invalidate(11, canvas);
    });
  }
  const mouseleave_handler = () => $$invalidate(17, hover = null);
  const focus_handler = (e) => {
    if (!focusCausedByClick && focusNextItem()) {
      e.stopPropagation();
      e.preventDefault();
    }
    $$invalidate(16, focusCausedByClick = false);
  };
  const keydown_handler = (event) => {
    switch (event.key) {
      case "ArrowLeft":
        dispatch2("scrollX", scale.toValue(-10));
        break;
      case "ArrowRight":
        dispatch2("scrollX", scale.toValue(10));
        break;
      case "ArrowUp":
        $$invalidate(4, scrollTop = Math.max(0, scrollTop - 10));
        break;
      case "ArrowDown":
        $$invalidate(4, scrollTop = Math.min(scrollHeight - viewport.height, scrollTop + 10));
        break;
      case "PageUp":
        $$invalidate(4, scrollTop = Math.max(0, scrollTop - viewport.height));
        break;
      case "PageDown":
        $$invalidate(4, scrollTop = Math.min(scrollHeight - viewport.height, scrollTop + viewport.height));
        break;
      case "Home":
        $$invalidate(4, scrollTop = 0);
        break;
      case "End":
        $$invalidate(4, scrollTop = scrollHeight - viewport.height);
        break;
      case "Tab":
        if (focusNextItem(event.shiftKey)) {
          event.stopPropagation();
          event.preventDefault();
        }
        break;
    }
  };
  const dragstart_handler = () => {
    $$invalidate(19, scrollbarDragging = true);
  };
  const dragend_handler = () => {
    $$invalidate(19, scrollbarDragging = false);
  };
  const dragstart_handler_1 = () => {
    $$invalidate(19, scrollbarDragging = true);
  };
  const dragend_handler_1 = () => {
    $$invalidate(19, scrollbarDragging = false);
  };
  function div5_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      stageCSSTarget = $$value;
      $$invalidate(13, stageCSSTarget);
    });
  }
  function div6_elementresize_handler() {
    scrollbarMeasurerInnerHeight = this.clientHeight;
    scrollbarMeasurerInnerWidth = this.clientWidth;
    scrollbarMeasurerFullHeight = this.offsetHeight;
    scrollbarMeasurerFullWidth = this.offsetWidth;
    $$invalidate(8, scrollbarMeasurerInnerHeight);
    $$invalidate(6, scrollbarMeasurerInnerWidth);
    $$invalidate(7, scrollbarMeasurerFullHeight);
    $$invalidate(5, scrollbarMeasurerFullWidth);
  }
  $$self.$$set = ($$props2) => {
    if ("display" in $$props2)
      $$invalidate(0, display = $$props2.display);
    if ("sortedItems" in $$props2)
      $$invalidate(1, sortedItems = $$props2.sortedItems);
    if ("scale" in $$props2)
      $$invalidate(2, scale = $$props2.scale);
    if ("focalValue" in $$props2)
      $$invalidate(36, focalValue = $$props2.focalValue);
    if ("width" in $$props2)
      $$invalidate(33, width = $$props2.width);
    if ("clientWidth" in $$props2)
      $$invalidate(34, clientWidth = $$props2.clientWidth);
    if ("clientHeight" in $$props2)
      $$invalidate(35, clientHeight = $$props2.clientHeight);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty[0] & /*sortedItems, scale*/
    6) {
      onPointsOrScaleChanged(sortedItems);
    }
    if ($$self.$$.dirty[1] & /*focalValue*/
    32) {
      onFocalValueChanged();
    }
    if ($$self.$$.dirty[0] & /*scrollTop*/
    16) {
      onScrollTopChanged();
    }
    if ($$self.$$.dirty[0] & /*scrollbarMeasurerFullWidth, scrollbarMeasurerInnerWidth*/
    96) {
      $$invalidate(10, scrollbarWidth = scrollbarMeasurerFullWidth - scrollbarMeasurerInnerWidth);
    }
    if ($$self.$$.dirty[0] & /*viewport, scrollbarWidth*/
    1032) {
      $$invalidate(34, clientWidth = viewport.width - scrollbarWidth);
    }
    if ($$self.$$.dirty[0] & /*scrollbarMeasurerFullHeight, scrollbarMeasurerInnerHeight*/
    384) {
      $$invalidate(9, scrollbarHeight = scrollbarMeasurerFullHeight - scrollbarMeasurerInnerHeight);
    }
    if ($$self.$$.dirty[0] & /*viewport, scrollbarHeight*/
    520) {
      $$invalidate(35, clientHeight = viewport.height - scrollbarHeight);
    }
  };
  return [
    display,
    sortedItems,
    scale,
    viewport,
    scrollTop,
    scrollbarMeasurerFullWidth,
    scrollbarMeasurerInnerWidth,
    scrollbarMeasurerFullHeight,
    scrollbarMeasurerInnerHeight,
    scrollbarHeight,
    scrollbarWidth,
    canvas,
    pointElements,
    stageCSSTarget,
    innerWidth,
    innerHeight,
    focusCausedByClick,
    hover,
    focus,
    scrollbarDragging,
    scrollHeight,
    visibleVAmount,
    hScrollValue,
    visibleHAmount,
    minHScrollValue,
    maxHScrollValue,
    dispatch2,
    handleScroll,
    handleClick,
    focusNextItem,
    detectHover,
    handleHScroll,
    handleVScroll,
    width,
    clientWidth,
    clientHeight,
    focalValue,
    focusOnItem,
    invalidateColors,
    div0_binding,
    div1_binding,
    div3_binding,
    div4_elementresize_handler,
    canvas_1_binding,
    mouseleave_handler,
    focus_handler,
    keydown_handler,
    dragstart_handler,
    dragend_handler,
    dragstart_handler_1,
    dragend_handler_1,
    div5_binding,
    div6_elementresize_handler
  ];
}
class CanvasStage extends SvelteComponent {
  constructor(options) {
    super();
    init(
      this,
      options,
      instance$e,
      create_fragment$h,
      safe_not_equal,
      {
        display: 0,
        sortedItems: 1,
        scale: 2,
        focalValue: 36,
        width: 33,
        clientWidth: 34,
        clientHeight: 35,
        focusOnItem: 37,
        invalidateColors: 38
      },
      null,
      [-1, -1, -1]
    );
  }
  get focusOnItem() {
    return this.$$.ctx[37];
  }
  get invalidateColors() {
    return this.$$.ctx[38];
  }
}
function create_fragment$g(ctx) {
  let svg;
  let svg_viewBox_value;
  let svg_class_value;
  let current;
  const default_slot_template = (
    /*#slots*/
    ctx[4].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[3],
    null
  );
  return {
    c() {
      svg = svg_element("svg");
      if (default_slot)
        default_slot.c();
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(
        svg,
        "width",
        /*width*/
        ctx[0]
      );
      attr(
        svg,
        "height",
        /*height*/
        ctx[1]
      );
      attr(svg, "viewBox", svg_viewBox_value = "0 0 " + /*width*/
      ctx[0] + " " + /*height*/
      ctx[1]);
      attr(svg, "fill", "none");
      attr(svg, "stroke", "currentColor");
      attr(svg, "stroke-width", "2");
      attr(svg, "stroke-linecap", "round");
      attr(svg, "stroke-linejoin", "round");
      attr(svg, "class", svg_class_value = "svg-icon " + /*className*/
      ctx[2]);
    },
    m(target, anchor) {
      insert(target, svg, anchor);
      if (default_slot) {
        default_slot.m(svg, null);
      }
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        8)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[3],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[3]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[3],
              dirty,
              null
            ),
            null
          );
        }
      }
      if (!current || dirty & /*width*/
      1) {
        attr(
          svg,
          "width",
          /*width*/
          ctx2[0]
        );
      }
      if (!current || dirty & /*height*/
      2) {
        attr(
          svg,
          "height",
          /*height*/
          ctx2[1]
        );
      }
      if (!current || dirty & /*width, height*/
      3 && svg_viewBox_value !== (svg_viewBox_value = "0 0 " + /*width*/
      ctx2[0] + " " + /*height*/
      ctx2[1])) {
        attr(svg, "viewBox", svg_viewBox_value);
      }
      if (!current || dirty & /*className*/
      4 && svg_class_value !== (svg_class_value = "svg-icon " + /*className*/
      ctx2[2])) {
        attr(svg, "class", svg_class_value);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(svg);
      }
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function instance$d($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { width = 24 } = $$props;
  let { height = 24 } = $$props;
  let { class: className = "" } = $$props;
  $$self.$$set = ($$props2) => {
    if ("width" in $$props2)
      $$invalidate(0, width = $$props2.width);
    if ("height" in $$props2)
      $$invalidate(1, height = $$props2.height);
    if ("class" in $$props2)
      $$invalidate(2, className = $$props2.class);
    if ("$$scope" in $$props2)
      $$invalidate(3, $$scope = $$props2.$$scope);
  };
  return [width, height, className, $$scope, slots];
}
class SvgIcon extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$d, create_fragment$g, safe_not_equal, { width: 0, height: 1, class: 2 });
  }
}
function create_fragment$f(ctx) {
  let button;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = (
    /*#slots*/
    ctx[4].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[3],
    null
  );
  let button_levels = [
    /*$$restProps*/
    ctx[2]
  ];
  let button_data = {};
  for (let i = 0; i < button_levels.length; i += 1) {
    button_data = assign(button_data, button_levels[i]);
  }
  return {
    c() {
      button = element("button");
      if (default_slot)
        default_slot.c();
      set_attributes(button, button_data);
    },
    m(target, anchor) {
      insert(target, button, anchor);
      if (default_slot) {
        default_slot.m(button, null);
      }
      if (button.autofocus)
        button.focus();
      current = true;
      if (!mounted) {
        dispose = [
          listen(button, "click", prevent_default(
            /*handleClick*/
            ctx[0]
          )),
          listen(
            button,
            "keydown",
            /*handleKeydown*/
            ctx[1]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        8)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[3],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[3]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[3],
              dirty,
              null
            ),
            null
          );
        }
      }
      set_attributes(button, button_data = get_spread_update(button_levels, [dirty & /*$$restProps*/
      4 && /*$$restProps*/
      ctx2[2]]));
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      if (default_slot)
        default_slot.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$c($$self, $$props, $$invalidate) {
  const omit_props_names = [];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  const dispatch2 = createEventDispatcher();
  function handleClick(event) {
    dispatch2("action", { inputEvent: event });
  }
  function handleKeydown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      dispatch2("action", { inputEvent: event });
    }
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(2, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("$$scope" in $$new_props)
      $$invalidate(3, $$scope = $$new_props.$$scope);
  };
  return [handleClick, handleKeydown, $$restProps, $$scope, slots];
}
class ActionButton extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$c, create_fragment$f, safe_not_equal, {});
  }
}
const TimelineNavigationControls_svelte_svelte_type_style_lang = "";
function create_default_slot_9(ctx) {
  let line0;
  let t;
  let line1;
  return {
    c() {
      line0 = svg_element("line");
      t = space();
      line1 = svg_element("line");
      attr(line0, "x1", "12");
      attr(line0, "y1", "5");
      attr(line0, "x2", "12");
      attr(line0, "y2", "19");
      attr(line1, "x1", "5");
      attr(line1, "y1", "12");
      attr(line1, "x2", "19");
      attr(line1, "y2", "12");
    },
    m(target, anchor) {
      insert(target, line0, anchor);
      insert(target, t, anchor);
      insert(target, line1, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(line0);
        detach(t);
        detach(line1);
      }
    }
  };
}
function create_default_slot_8(ctx) {
  let svgicon;
  let current;
  svgicon = new SvgIcon({
    props: {
      $$slots: { default: [create_default_slot_9] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(svgicon.$$.fragment);
    },
    m(target, anchor) {
      mount_component(svgicon, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const svgicon_changes = {};
      if (dirty & /*$$scope*/
      64) {
        svgicon_changes.$$scope = { dirty, ctx: ctx2 };
      }
      svgicon.$set(svgicon_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(svgicon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(svgicon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(svgicon, detaching);
    }
  };
}
function create_default_slot_7(ctx) {
  let line;
  return {
    c() {
      line = svg_element("line");
      attr(line, "x1", "5");
      attr(line, "y1", "12");
      attr(line, "x2", "19");
      attr(line, "y2", "12");
    },
    m(target, anchor) {
      insert(target, line, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(line);
      }
    }
  };
}
function create_default_slot_6(ctx) {
  let svgicon;
  let current;
  svgicon = new SvgIcon({
    props: {
      $$slots: { default: [create_default_slot_7] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(svgicon.$$.fragment);
    },
    m(target, anchor) {
      mount_component(svgicon, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const svgicon_changes = {};
      if (dirty & /*$$scope*/
      64) {
        svgicon_changes.$$scope = { dirty, ctx: ctx2 };
      }
      svgicon.$set(svgicon_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(svgicon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(svgicon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(svgicon, detaching);
    }
  };
}
function create_default_slot_5(ctx) {
  let path0;
  let t0;
  let path1;
  let t1;
  let path2;
  let t2;
  let path3;
  return {
    c() {
      path0 = svg_element("path");
      t0 = space();
      path1 = svg_element("path");
      t1 = space();
      path2 = svg_element("path");
      t2 = space();
      path3 = svg_element("path");
      attr(path0, "d", "M8 3H5a2 2 0 0 0-2 2v3");
      attr(path1, "d", "M21 8V5a2 2 0 0 0-2-2h-3");
      attr(path2, "d", "M3 16v3a2 2 0 0 0 2 2h3");
      attr(path3, "d", "M16 21h3a2 2 0 0 0 2-2v-3");
    },
    m(target, anchor) {
      insert(target, path0, anchor);
      insert(target, t0, anchor);
      insert(target, path1, anchor);
      insert(target, t1, anchor);
      insert(target, path2, anchor);
      insert(target, t2, anchor);
      insert(target, path3, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(path0);
        detach(t0);
        detach(path1);
        detach(t1);
        detach(path2);
        detach(t2);
        detach(path3);
      }
    }
  };
}
function create_default_slot_4(ctx) {
  let svgicon;
  let current;
  svgicon = new SvgIcon({
    props: {
      $$slots: { default: [create_default_slot_5] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(svgicon.$$.fragment);
    },
    m(target, anchor) {
      mount_component(svgicon, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const svgicon_changes = {};
      if (dirty & /*$$scope*/
      64) {
        svgicon_changes.$$scope = { dirty, ctx: ctx2 };
      }
      svgicon.$set(svgicon_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(svgicon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(svgicon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(svgicon, detaching);
    }
  };
}
function create_default_slot_3$1(ctx) {
  let path0;
  let t0;
  let path1;
  let t1;
  let path2;
  return {
    c() {
      path0 = svg_element("path");
      t0 = space();
      path1 = svg_element("path");
      t1 = space();
      path2 = svg_element("path");
      attr(path0, "d", "M3 19V5");
      attr(path1, "d", "m13 6-6 6 6 6");
      attr(path2, "d", "M7 12h14");
    },
    m(target, anchor) {
      insert(target, path0, anchor);
      insert(target, t0, anchor);
      insert(target, path1, anchor);
      insert(target, t1, anchor);
      insert(target, path2, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(path0);
        detach(t0);
        detach(path1);
        detach(t1);
        detach(path2);
      }
    }
  };
}
function create_default_slot_2$1(ctx) {
  let svgicon;
  let current;
  svgicon = new SvgIcon({
    props: {
      $$slots: { default: [create_default_slot_3$1] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(svgicon.$$.fragment);
    },
    m(target, anchor) {
      mount_component(svgicon, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const svgicon_changes = {};
      if (dirty & /*$$scope*/
      64) {
        svgicon_changes.$$scope = { dirty, ctx: ctx2 };
      }
      svgicon.$set(svgicon_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(svgicon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(svgicon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(svgicon, detaching);
    }
  };
}
function create_default_slot_1$3(ctx) {
  let path0;
  let t;
  let path1;
  return {
    c() {
      path0 = svg_element("path");
      t = space();
      path1 = svg_element("path");
      attr(path0, "d", "m12 19-7-7 7-7");
      attr(path1, "d", "M19 12H5");
    },
    m(target, anchor) {
      insert(target, path0, anchor);
      insert(target, t, anchor);
      insert(target, path1, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(path0);
        detach(t);
        detach(path1);
      }
    }
  };
}
function create_default_slot$7(ctx) {
  let svgicon;
  let current;
  svgicon = new SvgIcon({
    props: {
      $$slots: { default: [create_default_slot_1$3] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(svgicon.$$.fragment);
    },
    m(target, anchor) {
      mount_component(svgicon, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const svgicon_changes = {};
      if (dirty & /*$$scope*/
      64) {
        svgicon_changes.$$scope = { dirty, ctx: ctx2 };
      }
      svgicon.$set(svgicon_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(svgicon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(svgicon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(svgicon, detaching);
    }
  };
}
function create_fragment$e(ctx) {
  let menu;
  let li0;
  let actionbutton0;
  let t0;
  let li1;
  let actionbutton1;
  let t1;
  let li2;
  let actionbutton2;
  let t2;
  let li3;
  let actionbutton3;
  let t3;
  let li4;
  let actionbutton4;
  let current;
  actionbutton0 = new ActionButton({
    props: {
      "aria-label": "Zoom In",
      class: "clickable-icon",
      $$slots: { default: [create_default_slot_8] },
      $$scope: { ctx }
    }
  });
  actionbutton0.$on(
    "action",
    /*triggerZoomIn*/
    ctx[0]
  );
  actionbutton1 = new ActionButton({
    props: {
      "aria-label": "Zoom Out",
      class: "clickable-icon",
      $$slots: { default: [create_default_slot_6] },
      $$scope: { ctx }
    }
  });
  actionbutton1.$on(
    "action",
    /*triggerZoomOut*/
    ctx[1]
  );
  actionbutton2 = new ActionButton({
    props: {
      "aria-label": "Zoom to Fit",
      class: "clickable-icon",
      $$slots: { default: [create_default_slot_4] },
      $$scope: { ctx }
    }
  });
  actionbutton2.$on(
    "action",
    /*triggerZoomToFit*/
    ctx[2]
  );
  actionbutton3 = new ActionButton({
    props: {
      "aria-label": "Scroll to Zero",
      class: "clickable-icon",
      $$slots: { default: [create_default_slot_2$1] },
      $$scope: { ctx }
    }
  });
  actionbutton3.$on(
    "action",
    /*triggerScrollToZero*/
    ctx[3]
  );
  actionbutton4 = new ActionButton({
    props: {
      "aria-label": "Scroll to First",
      class: "clickable-icon",
      $$slots: { default: [create_default_slot$7] },
      $$scope: { ctx }
    }
  });
  actionbutton4.$on(
    "action",
    /*triggerScrollToFirst*/
    ctx[4]
  );
  return {
    c() {
      menu = element("menu");
      li0 = element("li");
      create_component(actionbutton0.$$.fragment);
      t0 = space();
      li1 = element("li");
      create_component(actionbutton1.$$.fragment);
      t1 = space();
      li2 = element("li");
      create_component(actionbutton2.$$.fragment);
      t2 = space();
      li3 = element("li");
      create_component(actionbutton3.$$.fragment);
      t3 = space();
      li4 = element("li");
      create_component(actionbutton4.$$.fragment);
      attr(li0, "class", "control-item");
      attr(li1, "class", "control-item");
      attr(li2, "class", "control-item");
      attr(li3, "class", "control-item");
      attr(li4, "class", "control-item");
      attr(menu, "class", "timeline-navigation-controls");
    },
    m(target, anchor) {
      insert(target, menu, anchor);
      append(menu, li0);
      mount_component(actionbutton0, li0, null);
      append(menu, t0);
      append(menu, li1);
      mount_component(actionbutton1, li1, null);
      append(menu, t1);
      append(menu, li2);
      mount_component(actionbutton2, li2, null);
      append(menu, t2);
      append(menu, li3);
      mount_component(actionbutton3, li3, null);
      append(menu, t3);
      append(menu, li4);
      mount_component(actionbutton4, li4, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      const actionbutton0_changes = {};
      if (dirty & /*$$scope*/
      64) {
        actionbutton0_changes.$$scope = { dirty, ctx: ctx2 };
      }
      actionbutton0.$set(actionbutton0_changes);
      const actionbutton1_changes = {};
      if (dirty & /*$$scope*/
      64) {
        actionbutton1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      actionbutton1.$set(actionbutton1_changes);
      const actionbutton2_changes = {};
      if (dirty & /*$$scope*/
      64) {
        actionbutton2_changes.$$scope = { dirty, ctx: ctx2 };
      }
      actionbutton2.$set(actionbutton2_changes);
      const actionbutton3_changes = {};
      if (dirty & /*$$scope*/
      64) {
        actionbutton3_changes.$$scope = { dirty, ctx: ctx2 };
      }
      actionbutton3.$set(actionbutton3_changes);
      const actionbutton4_changes = {};
      if (dirty & /*$$scope*/
      64) {
        actionbutton4_changes.$$scope = { dirty, ctx: ctx2 };
      }
      actionbutton4.$set(actionbutton4_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(actionbutton0.$$.fragment, local);
      transition_in(actionbutton1.$$.fragment, local);
      transition_in(actionbutton2.$$.fragment, local);
      transition_in(actionbutton3.$$.fragment, local);
      transition_in(actionbutton4.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(actionbutton0.$$.fragment, local);
      transition_out(actionbutton1.$$.fragment, local);
      transition_out(actionbutton2.$$.fragment, local);
      transition_out(actionbutton3.$$.fragment, local);
      transition_out(actionbutton4.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(menu);
      }
      destroy_component(actionbutton0);
      destroy_component(actionbutton1);
      destroy_component(actionbutton2);
      destroy_component(actionbutton3);
      destroy_component(actionbutton4);
    }
  };
}
function instance$b($$self, $$props, $$invalidate) {
  let { navigation } = $$props;
  function triggerZoomIn() {
    navigation.zoomIn();
  }
  function triggerZoomOut() {
    navigation.zoomOut();
  }
  function triggerZoomToFit() {
    navigation.zoomToFit();
  }
  function triggerScrollToZero() {
    navigation.scrollToValue(0);
  }
  function triggerScrollToFirst() {
    navigation.scrollToFirst();
  }
  $$self.$$set = ($$props2) => {
    if ("navigation" in $$props2)
      $$invalidate(5, navigation = $$props2.navigation);
  };
  return [
    triggerZoomIn,
    triggerZoomOut,
    triggerZoomToFit,
    triggerScrollToZero,
    triggerScrollToFirst,
    navigation
  ];
}
class TimelineNavigationControls extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$b, create_fragment$e, safe_not_equal, { navigation: 5 });
  }
}
function writableProperties(object, onChildModified) {
  const children2 = /* @__PURE__ */ new Map();
  const childNamespaces = /* @__PURE__ */ new Map();
  return {
    make(key, defaultValue) {
      let child = children2.get(String(key));
      if (child) {
        return child;
      }
      if (key in object) {
        child = writable(object[key]);
      } else {
        child = writable(defaultValue);
      }
      child.subscribe((newValue) => {
        if (object[key] !== newValue) {
          object[key] = newValue;
          onChildModified(key, newValue);
        }
      });
      children2.set(String(key), child);
      return child;
    },
    namespace(name) {
      let childNamespace = childNamespaces.get(String(name));
      if (childNamespace) {
        return childNamespace;
      }
      const childObj = object[name] || {};
      childNamespace = writableProperties(
        childObj,
        (key, newObj) => {
          childObj[key] = newObj;
          object[name] = childObj;
          onChildModified(name, childObj);
        }
      );
      childNamespaces.set(String(name), childNamespace);
      return childNamespace;
    }
  };
}
const CollapsableSection_svelte_svelte_type_style_lang = "";
function create_default_slot_1$2(ctx) {
  let path;
  return {
    c() {
      path = svg_element("path");
      attr(path, "d", "M3 8L12 17L21 8");
    },
    m(target, anchor) {
      insert(target, path, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(path);
      }
    }
  };
}
function create_default_slot$6(ctx) {
  let svgicon;
  let t0;
  let t1;
  let current;
  svgicon = new SvgIcon({
    props: {
      $$slots: { default: [create_default_slot_1$2] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(svgicon.$$.fragment);
      t0 = space();
      t1 = text(
        /*name*/
        ctx[1]
      );
    },
    m(target, anchor) {
      mount_component(svgicon, target, anchor);
      insert(target, t0, anchor);
      insert(target, t1, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const svgicon_changes = {};
      if (dirty & /*$$scope*/
      64) {
        svgicon_changes.$$scope = { dirty, ctx: ctx2 };
      }
      svgicon.$set(svgicon_changes);
      if (!current || dirty & /*name*/
      2)
        set_data(
          t1,
          /*name*/
          ctx2[1]
        );
    },
    i(local) {
      if (current)
        return;
      transition_in(svgicon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(svgicon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t0);
        detach(t1);
      }
      destroy_component(svgicon, detaching);
    }
  };
}
function create_if_block$4(ctx) {
  let div;
  let div_transition;
  let current;
  const default_slot_template = (
    /*#slots*/
    ctx[5].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[6],
    null
  );
  return {
    c() {
      div = element("div");
      if (default_slot)
        default_slot.c();
      attr(div, "class", "content");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (default_slot) {
        default_slot.m(div, null);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        64)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[6],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[6]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[6],
              dirty,
              null
            ),
            null
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      if (local) {
        add_render_callback(() => {
          if (!current)
            return;
          if (!div_transition)
            div_transition = create_bidirectional_transition(
              div,
              slide,
              {
                delay: 0,
                duration: 200,
                easing: quintOut,
                axis: "y"
              },
              true
            );
          div_transition.run(1);
        });
      }
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      if (local) {
        if (!div_transition)
          div_transition = create_bidirectional_transition(
            div,
            slide,
            {
              delay: 0,
              duration: 200,
              easing: quintOut,
              axis: "y"
            },
            false
          );
        div_transition.run(0);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (default_slot)
        default_slot.d(detaching);
      if (detaching && div_transition)
        div_transition.end();
    }
  };
}
function create_fragment$d(ctx) {
  let section;
  let actionbutton;
  let t;
  let section_class_value;
  let current;
  actionbutton = new ActionButton({
    props: {
      tabindex: (
        /*tabindex*/
        ctx[3]
      ),
      class: "header clickable-icon collapse-icon " + /*collapsed*/
      (ctx[0] ? "is-collapsed" : ""),
      $$slots: { default: [create_default_slot$6] },
      $$scope: { ctx }
    }
  });
  actionbutton.$on(
    "action",
    /*toggleCollapse*/
    ctx[4]
  );
  let if_block = !/*collapsed*/
  ctx[0] && create_if_block$4(ctx);
  return {
    c() {
      section = element("section");
      create_component(actionbutton.$$.fragment);
      t = space();
      if (if_block)
        if_block.c();
      attr(section, "class", section_class_value = "collapsable" + /*collapsed*/
      (ctx[0] ? " collapsed" : "") + " " + /*className*/
      ctx[2] + " svelte-1dp90dm");
    },
    m(target, anchor) {
      insert(target, section, anchor);
      mount_component(actionbutton, section, null);
      append(section, t);
      if (if_block)
        if_block.m(section, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      const actionbutton_changes = {};
      if (dirty & /*tabindex*/
      8)
        actionbutton_changes.tabindex = /*tabindex*/
        ctx2[3];
      if (dirty & /*collapsed*/
      1)
        actionbutton_changes.class = "header clickable-icon collapse-icon " + /*collapsed*/
        (ctx2[0] ? "is-collapsed" : "");
      if (dirty & /*$$scope, name*/
      66) {
        actionbutton_changes.$$scope = { dirty, ctx: ctx2 };
      }
      actionbutton.$set(actionbutton_changes);
      if (!/*collapsed*/
      ctx2[0]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*collapsed*/
          1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$4(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(section, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
      if (!current || dirty & /*collapsed, className*/
      5 && section_class_value !== (section_class_value = "collapsable" + /*collapsed*/
      (ctx2[0] ? " collapsed" : "") + " " + /*className*/
      ctx2[2] + " svelte-1dp90dm")) {
        attr(section, "class", section_class_value);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(actionbutton.$$.fragment, local);
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(actionbutton.$$.fragment, local);
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(section);
      }
      destroy_component(actionbutton);
      if (if_block)
        if_block.d();
    }
  };
}
function instance$a($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { name } = $$props;
  let { class: className = "" } = $$props;
  let { tabindex = 0 } = $$props;
  let { collapsed = true } = $$props;
  function toggleCollapse() {
    $$invalidate(0, collapsed = !collapsed);
  }
  $$self.$$set = ($$props2) => {
    if ("name" in $$props2)
      $$invalidate(1, name = $$props2.name);
    if ("class" in $$props2)
      $$invalidate(2, className = $$props2.class);
    if ("tabindex" in $$props2)
      $$invalidate(3, tabindex = $$props2.tabindex);
    if ("collapsed" in $$props2)
      $$invalidate(0, collapsed = $$props2.collapsed);
    if ("$$scope" in $$props2)
      $$invalidate(6, $$scope = $$props2.$$scope);
  };
  return [collapsed, name, className, tabindex, toggleCollapse, slots, $$scope];
}
class CollapsableSection extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$a, create_fragment$d, safe_not_equal, {
      name: 1,
      class: 2,
      tabindex: 3,
      collapsed: 0
    });
  }
}
const ToggleInput_svelte_svelte_type_style_lang = "";
const TimelineSettings_svelte_svelte_type_style_lang = "";
function create_else_block$1(ctx) {
  let actionbutton;
  let current;
  actionbutton = new ActionButton({
    props: {
      id: "toggle-button",
      class: "close-button clickable-icon",
      "aria-label": "Close",
      $$slots: { default: [create_default_slot_2] },
      $$scope: { ctx }
    }
  });
  actionbutton.$on(
    "action",
    /*close*/
    ctx[2]
  );
  return {
    c() {
      create_component(actionbutton.$$.fragment);
    },
    m(target, anchor) {
      mount_component(actionbutton, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const actionbutton_changes = {};
      if (dirty & /*$$scope*/
      128) {
        actionbutton_changes.$$scope = { dirty, ctx: ctx2 };
      }
      actionbutton.$set(actionbutton_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(actionbutton.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(actionbutton.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(actionbutton, detaching);
    }
  };
}
function create_if_block$3(ctx) {
  let actionbutton;
  let current;
  actionbutton = new ActionButton({
    props: {
      id: "toggle-button",
      class: "open-button clickable-icon",
      "aria-label": "Open",
      $$slots: { default: [create_default_slot$5] },
      $$scope: { ctx }
    }
  });
  actionbutton.$on(
    "action",
    /*open*/
    ctx[3]
  );
  return {
    c() {
      create_component(actionbutton.$$.fragment);
    },
    m(target, anchor) {
      mount_component(actionbutton, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const actionbutton_changes = {};
      if (dirty & /*$$scope*/
      128) {
        actionbutton_changes.$$scope = { dirty, ctx: ctx2 };
      }
      actionbutton.$set(actionbutton_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(actionbutton.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(actionbutton.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(actionbutton, detaching);
    }
  };
}
function create_default_slot_3(ctx) {
  let line0;
  let t;
  let line1;
  return {
    c() {
      line0 = svg_element("line");
      t = space();
      line1 = svg_element("line");
      attr(line0, "x1", "18");
      attr(line0, "y1", "6");
      attr(line0, "x2", "6");
      attr(line0, "y2", "18");
      attr(line1, "x1", "6");
      attr(line1, "y1", "6");
      attr(line1, "x2", "18");
      attr(line1, "y2", "18");
    },
    m(target, anchor) {
      insert(target, line0, anchor);
      insert(target, t, anchor);
      insert(target, line1, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(line0);
        detach(t);
        detach(line1);
      }
    }
  };
}
function create_default_slot_2(ctx) {
  let svgicon;
  let current;
  svgicon = new SvgIcon({
    props: {
      $$slots: { default: [create_default_slot_3] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(svgicon.$$.fragment);
    },
    m(target, anchor) {
      mount_component(svgicon, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const svgicon_changes = {};
      if (dirty & /*$$scope*/
      128) {
        svgicon_changes.$$scope = { dirty, ctx: ctx2 };
      }
      svgicon.$set(svgicon_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(svgicon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(svgicon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(svgicon, detaching);
    }
  };
}
function create_default_slot_1$1(ctx) {
  let path;
  let t;
  let circle;
  return {
    c() {
      path = svg_element("path");
      t = space();
      circle = svg_element("circle");
      attr(path, "d", "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z");
      attr(circle, "cx", "12");
      attr(circle, "cy", "12");
      attr(circle, "r", "3");
    },
    m(target, anchor) {
      insert(target, path, anchor);
      insert(target, t, anchor);
      insert(target, circle, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(path);
        detach(t);
        detach(circle);
      }
    }
  };
}
function create_default_slot$5(ctx) {
  let svgicon;
  let current;
  svgicon = new SvgIcon({
    props: {
      $$slots: { default: [create_default_slot_1$1] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(svgicon.$$.fragment);
    },
    m(target, anchor) {
      mount_component(svgicon, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const svgicon_changes = {};
      if (dirty & /*$$scope*/
      128) {
        svgicon_changes.$$scope = { dirty, ctx: ctx2 };
      }
      svgicon.$set(svgicon_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(svgicon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(svgicon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(svgicon, detaching);
    }
  };
}
function create_fragment$c(ctx) {
  let form;
  let current_block_type_index;
  let if_block;
  let t;
  let form_class_value;
  let current;
  let mounted;
  let dispose;
  const if_block_creators = [create_if_block$3, create_else_block$1];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (!/*$isOpen*/
    ctx2[0])
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  const default_slot_template = (
    /*#slots*/
    ctx[5].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[7],
    null
  );
  return {
    c() {
      form = element("form");
      if_block.c();
      t = space();
      if (default_slot)
        default_slot.c();
      attr(form, "class", form_class_value = "timeline-settings control-group" + /*$isOpen*/
      (ctx[0] ? " open" : " closed") + " svelte-1cwwnb1");
    },
    m(target, anchor) {
      insert(target, form, anchor);
      if_blocks[current_block_type_index].m(form, null);
      append(form, t);
      if (default_slot) {
        default_slot.m(form, null);
      }
      current = true;
      if (!mounted) {
        dispose = listen(form, "submit", stop_propagation(prevent_default(
          /*submit_handler*/
          ctx[6]
        )));
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(form, t);
      }
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        128)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[7],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[7]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[7],
              dirty,
              null
            ),
            null
          );
        }
      }
      if (!current || dirty & /*$isOpen*/
      1 && form_class_value !== (form_class_value = "timeline-settings control-group" + /*$isOpen*/
      (ctx2[0] ? " open" : " closed") + " svelte-1cwwnb1")) {
        attr(form, "class", form_class_value);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(form);
      }
      if_blocks[current_block_type_index].d();
      if (default_slot)
        default_slot.d(detaching);
      mounted = false;
      dispose();
    }
  };
}
function instance$9($$self, $$props, $$invalidate) {
  let $isOpen;
  let { $$slots: slots = {}, $$scope } = $$props;
  let { namespacedWritable } = $$props;
  const isOpen = namespacedWritable.make("isOpen", false);
  component_subscribe($$self, isOpen, (value) => $$invalidate(0, $isOpen = value));
  function close() {
    set_store_value(isOpen, $isOpen = false, $isOpen);
  }
  function open() {
    set_store_value(isOpen, $isOpen = true, $isOpen);
  }
  function submit_handler(event) {
    bubble.call(this, $$self, event);
  }
  $$self.$$set = ($$props2) => {
    if ("namespacedWritable" in $$props2)
      $$invalidate(4, namespacedWritable = $$props2.namespacedWritable);
    if ("$$scope" in $$props2)
      $$invalidate(7, $$scope = $$props2.$$scope);
  };
  return [
    $isOpen,
    isOpen,
    close,
    open,
    namespacedWritable,
    slots,
    submit_handler,
    $$scope
  ];
}
class TimelineSettings extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$9, create_fragment$c, safe_not_equal, { namespacedWritable: 4 });
  }
}
const Timeline_svelte_svelte_type_style_lang = "";
const get_additional_settings_slot_changes = (dirty) => ({});
const get_additional_settings_slot_context = (ctx) => ({});
function create_default_slot$4(ctx) {
  let current;
  const additional_settings_slot_template = (
    /*#slots*/
    ctx[22]["additional-settings"]
  );
  const additional_settings_slot = create_slot(
    additional_settings_slot_template,
    ctx,
    /*$$scope*/
    ctx[33],
    get_additional_settings_slot_context
  );
  return {
    c() {
      if (additional_settings_slot)
        additional_settings_slot.c();
    },
    m(target, anchor) {
      if (additional_settings_slot) {
        additional_settings_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (additional_settings_slot) {
        if (additional_settings_slot.p && (!current || dirty[1] & /*$$scope*/
        4)) {
          update_slot_base(
            additional_settings_slot,
            additional_settings_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[33],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[33]
            ) : get_slot_changes(
              additional_settings_slot_template,
              /*$$scope*/
              ctx2[33],
              dirty,
              get_additional_settings_slot_changes
            ),
            get_additional_settings_slot_context
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(additional_settings_slot, local);
      current = true;
    },
    o(local) {
      transition_out(additional_settings_slot, local);
      current = false;
    },
    d(detaching) {
      if (additional_settings_slot)
        additional_settings_slot.d(detaching);
    }
  };
}
function create_fragment$b(ctx) {
  let div;
  let timelineruler;
  let updating_clientHeight;
  let t0;
  let canvasstage;
  let updating_width;
  let updating_clientWidth;
  let t1;
  let menu;
  let timelinenavigationcontrols;
  let t2;
  let timelinesettings;
  let style___ruler_height = `${/*rulerHeight*/
  ctx[5]}px`;
  let style___stage_client_width = `${/*stageClientWidth*/
  ctx[3]}px`;
  let current;
  function timelineruler_clientHeight_binding(value) {
    ctx[23](value);
  }
  let timelineruler_props = {
    display: (
      /*display*/
      ctx[6]
    ),
    scale: (
      /*$scale*/
      ctx[8]
    ),
    focalValue: (
      /*$focalValue*/
      ctx[7]
    )
  };
  if (
    /*rulerHeight*/
    ctx[5] !== void 0
  ) {
    timelineruler_props.clientHeight = /*rulerHeight*/
    ctx[5];
  }
  timelineruler = new TimelineRuler({ props: timelineruler_props });
  binding_callbacks.push(() => bind(timelineruler, "clientHeight", timelineruler_clientHeight_binding));
  function canvasstage_width_binding(value) {
    ctx[25](value);
  }
  function canvasstage_clientWidth_binding(value) {
    ctx[26](value);
  }
  let canvasstage_props = {
    display: (
      /*display*/
      ctx[6]
    ),
    sortedItems: (
      /*sortedItems*/
      ctx[2]
    ),
    scale: (
      /*$scale*/
      ctx[8]
    ),
    focalValue: (
      /*$focalValue*/
      ctx[7]
    )
  };
  if (
    /*$stageWidth*/
    ctx[1] !== void 0
  ) {
    canvasstage_props.width = /*$stageWidth*/
    ctx[1];
  }
  if (
    /*stageClientWidth*/
    ctx[3] !== void 0
  ) {
    canvasstage_props.clientWidth = /*stageClientWidth*/
    ctx[3];
  }
  canvasstage = new CanvasStage({ props: canvasstage_props });
  ctx[24](canvasstage);
  binding_callbacks.push(() => bind(canvasstage, "width", canvasstage_width_binding));
  binding_callbacks.push(() => bind(canvasstage, "clientWidth", canvasstage_clientWidth_binding));
  canvasstage.$on(
    "scrollToValue",
    /*scrollToValue_handler*/
    ctx[27]
  );
  canvasstage.$on(
    "scrollX",
    /*scrollX_handler*/
    ctx[28]
  );
  canvasstage.$on(
    "zoomIn",
    /*zoomIn_handler*/
    ctx[29]
  );
  canvasstage.$on(
    "zoomOut",
    /*zoomOut_handler*/
    ctx[30]
  );
  canvasstage.$on(
    "select",
    /*select_handler*/
    ctx[31]
  );
  canvasstage.$on(
    "focus",
    /*focus_handler*/
    ctx[32]
  );
  timelinenavigationcontrols = new TimelineNavigationControls({
    props: { navigation: (
      /*navigation*/
      ctx[13]
    ) }
  });
  timelinesettings = new TimelineSettings({
    props: {
      namespacedWritable: (
        /*namespacedWritable*/
        ctx[0].namespace("settings")
      ),
      $$slots: { default: [create_default_slot$4] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      div = element("div");
      create_component(timelineruler.$$.fragment);
      t0 = space();
      create_component(canvasstage.$$.fragment);
      t1 = space();
      menu = element("menu");
      create_component(timelinenavigationcontrols.$$.fragment);
      t2 = space();
      create_component(timelinesettings.$$.fragment);
      attr(menu, "class", "timeline-controls svelte-1geja7t");
      attr(div, "class", "timeline svelte-1geja7t");
      set_style(div, "--ruler-height", style___ruler_height);
      set_style(div, "--stage-client-width", style___stage_client_width);
    },
    m(target, anchor) {
      insert(target, div, anchor);
      mount_component(timelineruler, div, null);
      append(div, t0);
      mount_component(canvasstage, div, null);
      append(div, t1);
      append(div, menu);
      mount_component(timelinenavigationcontrols, menu, null);
      append(menu, t2);
      mount_component(timelinesettings, menu, null);
      current = true;
    },
    p(ctx2, dirty) {
      const timelineruler_changes = {};
      if (dirty[0] & /*display*/
      64)
        timelineruler_changes.display = /*display*/
        ctx2[6];
      if (dirty[0] & /*$scale*/
      256)
        timelineruler_changes.scale = /*$scale*/
        ctx2[8];
      if (dirty[0] & /*$focalValue*/
      128)
        timelineruler_changes.focalValue = /*$focalValue*/
        ctx2[7];
      if (!updating_clientHeight && dirty[0] & /*rulerHeight*/
      32) {
        updating_clientHeight = true;
        timelineruler_changes.clientHeight = /*rulerHeight*/
        ctx2[5];
        add_flush_callback(() => updating_clientHeight = false);
      }
      timelineruler.$set(timelineruler_changes);
      const canvasstage_changes = {};
      if (dirty[0] & /*display*/
      64)
        canvasstage_changes.display = /*display*/
        ctx2[6];
      if (dirty[0] & /*sortedItems*/
      4)
        canvasstage_changes.sortedItems = /*sortedItems*/
        ctx2[2];
      if (dirty[0] & /*$scale*/
      256)
        canvasstage_changes.scale = /*$scale*/
        ctx2[8];
      if (dirty[0] & /*$focalValue*/
      128)
        canvasstage_changes.focalValue = /*$focalValue*/
        ctx2[7];
      if (!updating_width && dirty[0] & /*$stageWidth*/
      2) {
        updating_width = true;
        canvasstage_changes.width = /*$stageWidth*/
        ctx2[1];
        add_flush_callback(() => updating_width = false);
      }
      if (!updating_clientWidth && dirty[0] & /*stageClientWidth*/
      8) {
        updating_clientWidth = true;
        canvasstage_changes.clientWidth = /*stageClientWidth*/
        ctx2[3];
        add_flush_callback(() => updating_clientWidth = false);
      }
      canvasstage.$set(canvasstage_changes);
      const timelinesettings_changes = {};
      if (dirty[0] & /*namespacedWritable*/
      1)
        timelinesettings_changes.namespacedWritable = /*namespacedWritable*/
        ctx2[0].namespace("settings");
      if (dirty[1] & /*$$scope*/
      4) {
        timelinesettings_changes.$$scope = { dirty, ctx: ctx2 };
      }
      timelinesettings.$set(timelinesettings_changes);
      if (dirty[0] & /*rulerHeight*/
      32 && style___ruler_height !== (style___ruler_height = `${/*rulerHeight*/
      ctx2[5]}px`)) {
        set_style(div, "--ruler-height", style___ruler_height);
      }
      if (dirty[0] & /*stageClientWidth*/
      8 && style___stage_client_width !== (style___stage_client_width = `${/*stageClientWidth*/
      ctx2[3]}px`)) {
        set_style(div, "--stage-client-width", style___stage_client_width);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(timelineruler.$$.fragment, local);
      transition_in(canvasstage.$$.fragment, local);
      transition_in(timelinenavigationcontrols.$$.fragment, local);
      transition_in(timelinesettings.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(timelineruler.$$.fragment, local);
      transition_out(canvasstage.$$.fragment, local);
      transition_out(timelinenavigationcontrols.$$.fragment, local);
      transition_out(timelinesettings.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_component(timelineruler);
      ctx[24](null);
      destroy_component(canvasstage);
      destroy_component(timelinenavigationcontrols);
      destroy_component(timelinesettings);
    }
  };
}
function instance$8($$self, $$props, $$invalidate) {
  let display;
  let $stageWidth;
  let $focalValue;
  let $persistedValuePerPixel;
  let $scale;
  let { $$slots: slots = {}, $$scope } = $$props;
  let { namespacedWritable } = $$props;
  let { displayPropertyAs } = $$props;
  const focalValue = namespacedWritable.make("focalValue", 0);
  component_subscribe($$self, focalValue, (value) => $$invalidate(7, $focalValue = value));
  const persistedValuePerPixel = namespacedWritable.make("scale", 1);
  component_subscribe($$self, persistedValuePerPixel, (value) => $$invalidate(21, $persistedValuePerPixel = value));
  let { items: unsortedItems = [] } = $$props;
  let sortedItems = [];
  const stageWidth = writable(0);
  component_subscribe($$self, stageWidth, (value) => $$invalidate(1, $stageWidth = value));
  let stageClientWidth = 0;
  function scaleStore(initialScale = new ValuePerPixelScale(1)) {
    function atLeastMinimum(value) {
      const valuePerPixel = value.toValue(1);
      const minimum = 1 / 100;
      if (Number.isNaN(valuePerPixel)) {
        return new ValuePerPixelScale(minimum);
      }
      return new ValuePerPixelScale(Math.max(minimum, valuePerPixel));
    }
    const { subscribe: subscribe2, set } = writable(atLeastMinimum(initialScale));
    return {
      subscribe: subscribe2,
      set: (newValue) => {
        const validated = atLeastMinimum(newValue);
        set(validated);
        set_store_value(persistedValuePerPixel, $persistedValuePerPixel = validated.valuePerPixel, $persistedValuePerPixel);
        return validated;
      }
    };
  }
  const scale = scaleStore(new ValuePerPixelScale($persistedValuePerPixel));
  component_subscribe($$self, scale, (value) => $$invalidate(8, $scale = value));
  const navigation = timelineNavigation(
    scale,
    {
      get() {
        return sortedItems;
      }
    },
    (updater) => {
      const newFocalValue = updater($focalValue);
      if (newFocalValue != $focalValue) {
        set_store_value(focalValue, $focalValue = newFocalValue, $focalValue);
      }
    },
    () => $stageWidth
  );
  function zoomToFit(items) {
    if (initialized) {
      navigation.zoomToFit(items, $stageWidth);
    } else {
      const unsubscribe = stageWidth.subscribe((newStageWidth) => {
        if (newStageWidth > 0) {
          navigation.zoomToFit(items, newStageWidth);
          unsubscribe();
        }
      });
    }
  }
  function refresh() {
    $$invalidate(2, sortedItems), $$invalidate(15, unsortedItems);
  }
  function focusOnItem(item) {
    canvasStage.focusOnItem(item);
  }
  let canvasStage;
  function invalidateColors() {
    canvasStage.invalidateColors();
  }
  let initialized = false;
  let rulerHeight = 0;
  function timelineruler_clientHeight_binding(value) {
    rulerHeight = value;
    $$invalidate(5, rulerHeight);
  }
  function canvasstage_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      canvasStage = $$value;
      $$invalidate(4, canvasStage);
    });
  }
  function canvasstage_width_binding(value) {
    $stageWidth = value;
    stageWidth.set($stageWidth);
  }
  function canvasstage_clientWidth_binding(value) {
    stageClientWidth = value;
    $$invalidate(3, stageClientWidth);
  }
  const scrollToValue_handler = (event) => navigation.scrollToValue(event.detail);
  const scrollX_handler = ({ detail }) => navigation.scrollToValue($focalValue + detail);
  const zoomIn_handler = ({ detail }) => navigation.zoomIn(detail);
  const zoomOut_handler = ({ detail }) => navigation.zoomOut(detail);
  function select_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focus_handler(event) {
    bubble.call(this, $$self, event);
  }
  $$self.$$set = ($$props2) => {
    if ("namespacedWritable" in $$props2)
      $$invalidate(0, namespacedWritable = $$props2.namespacedWritable);
    if ("displayPropertyAs" in $$props2)
      $$invalidate(14, displayPropertyAs = $$props2.displayPropertyAs);
    if ("items" in $$props2)
      $$invalidate(15, unsortedItems = $$props2.items);
    if ("$$scope" in $$props2)
      $$invalidate(33, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty[0] & /*unsortedItems*/
    32768) {
      $$invalidate(2, sortedItems = unsortedItems.toSorted((a, b) => a.value() - b.value()));
    }
    if ($$self.$$.dirty[0] & /*$persistedValuePerPixel*/
    2097152) {
      set_store_value(scale, $scale = new ValuePerPixelScale($persistedValuePerPixel), $scale);
    }
    if ($$self.$$.dirty[0] & /*initialized, $stageWidth*/
    1048578) {
      if (!initialized) {
        if ($stageWidth > 0) {
          $$invalidate(20, initialized = true);
        }
      }
    }
    if ($$self.$$.dirty[0] & /*displayPropertyAs*/
    16384) {
      $$invalidate(6, display = displayPropertyAs === "date" ? timelineDateValueDisplay() : timelineNumericValueDisplay());
    }
  };
  return [
    namespacedWritable,
    $stageWidth,
    sortedItems,
    stageClientWidth,
    canvasStage,
    rulerHeight,
    display,
    $focalValue,
    $scale,
    focalValue,
    persistedValuePerPixel,
    stageWidth,
    scale,
    navigation,
    displayPropertyAs,
    unsortedItems,
    zoomToFit,
    refresh,
    focusOnItem,
    invalidateColors,
    initialized,
    $persistedValuePerPixel,
    slots,
    timelineruler_clientHeight_binding,
    canvasstage_binding,
    canvasstage_width_binding,
    canvasstage_clientWidth_binding,
    scrollToValue_handler,
    scrollX_handler,
    zoomIn_handler,
    zoomOut_handler,
    select_handler,
    focus_handler,
    $$scope
  ];
}
class Timeline extends SvelteComponent {
  constructor(options) {
    super();
    init(
      this,
      options,
      instance$8,
      create_fragment$b,
      safe_not_equal,
      {
        namespacedWritable: 0,
        displayPropertyAs: 14,
        items: 15,
        zoomToFit: 16,
        refresh: 17,
        focusOnItem: 18,
        invalidateColors: 19
      },
      null,
      [-1, -1]
    );
  }
  get zoomToFit() {
    return this.$$.ctx[16];
  }
  get refresh() {
    return this.$$.ctx[17];
  }
  get focusOnItem() {
    return this.$$.ctx[18];
  }
  get invalidateColors() {
    return this.$$.ctx[19];
  }
}
class TimelineFileItem {
  constructor(obsidianFile, propertySelection) {
    __privateAdd(this, _getCachedValue);
    __privateAdd(this, _calculateValue);
    __publicField(this, "_group");
    __privateAdd(this, _value, void 0);
    __publicField(this, "value");
    this.obsidianFile = obsidianFile;
    this.propertySelection = propertySelection;
    this.value = __privateMethod(this, _calculateValue, calculateValue_fn);
  }
  id() {
    return this.obsidianFile.id();
  }
  _invalidateValueCache() {
    __privateSet(this, _value, void 0);
    this.value = __privateMethod(this, _calculateValue, calculateValue_fn);
  }
  name() {
    return this.obsidianFile.name();
  }
  applyGroup(group2) {
    this._group = group2;
  }
  color() {
    var _a;
    return (_a = this._group) == null ? void 0 : _a.color;
  }
  group() {
    var _a;
    return (_a = this._group) == null ? void 0 : _a.id;
  }
  forgetGroup() {
    this._group = void 0;
  }
}
_value = new WeakMap();
_getCachedValue = new WeakSet();
getCachedValue_fn = function() {
  return __privateGet(this, _value);
};
_calculateValue = new WeakSet();
calculateValue_fn = function() {
  const value = this.propertySelection.selectProperty(this.obsidianFile);
  __privateSet(this, _value, value);
  this.value = __privateMethod(this, _getCachedValue, getCachedValue_fn);
  return value;
};
const GroupForm_svelte_svelte_type_style_lang = "";
function create_default_slot$3(ctx) {
  let svg;
  let line0;
  let line1;
  return {
    c() {
      svg = svg_element("svg");
      line0 = svg_element("line");
      line1 = svg_element("line");
      attr(line0, "x1", "18");
      attr(line0, "y1", "6");
      attr(line0, "x2", "6");
      attr(line0, "y2", "18");
      attr(line1, "x1", "6");
      attr(line1, "y1", "6");
      attr(line1, "x2", "18");
      attr(line1, "y2", "18");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg, "width", "24");
      attr(svg, "height", "24");
      attr(svg, "viewBox", "0 0 24 24");
      attr(svg, "fill", "none");
      attr(svg, "stroke", "currentColor");
      attr(svg, "stroke-width", "2");
      attr(svg, "stroke-linecap", "round");
      attr(svg, "stroke-linejoin", "round");
      attr(svg, "class", "svg-icon lucide-x");
    },
    m(target, anchor) {
      insert(target, svg, anchor);
      append(svg, line0);
      append(svg, line1);
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(svg);
      }
    }
  };
}
function create_fragment$a(ctx) {
  let fieldset;
  let input0;
  let t0;
  let input1;
  let t1;
  let actionbutton;
  let fieldset_class_value;
  let current;
  let mounted;
  let dispose;
  actionbutton = new ActionButton({
    props: {
      class: "clickable-icon",
      "aria-label": "Delete group",
      $$slots: { default: [create_default_slot$3] },
      $$scope: { ctx }
    }
  });
  actionbutton.$on(
    "action",
    /*action_handler*/
    ctx[17]
  );
  return {
    c() {
      fieldset = element("fieldset");
      input0 = element("input");
      t0 = space();
      input1 = element("input");
      t1 = space();
      create_component(actionbutton.$$.fragment);
      attr(input0, "type", "text");
      attr(input0, "spellcheck", "false");
      attr(input0, "placeholder", "Enter query...");
      attr(input1, "type", "color");
      attr(input1, "aria-label", "Click to change color\nDrag to reorder groups");
      attr(input1, "class", "svelte-17c5kxv");
      attr(
        fieldset,
        "style",
        /*style*/
        ctx[0]
      );
      attr(fieldset, "class", fieldset_class_value = "group " + /*dragging*/
      (ctx[3] ? "dragging" : "") + " " + /*pushDown*/
      (ctx[4] ? "pushDown" : "") + " svelte-17c5kxv");
    },
    m(target, anchor) {
      insert(target, fieldset, anchor);
      append(fieldset, input0);
      set_input_value(
        input0,
        /*$query*/
        ctx[6]
      );
      append(fieldset, t0);
      append(fieldset, input1);
      set_input_value(
        input1,
        /*$color*/
        ctx[7]
      );
      append(fieldset, t1);
      mount_component(actionbutton, fieldset, null);
      ctx[18](fieldset);
      current = true;
      if (!mounted) {
        dispose = [
          listen(
            input0,
            "input",
            /*input0_input_handler*/
            ctx[15]
          ),
          listen(
            input1,
            "input",
            /*input1_input_handler*/
            ctx[16]
          ),
          listen(
            input1,
            "mousedown",
            /*primeDrag*/
            ctx[10]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & /*$query*/
      64 && input0.value !== /*$query*/
      ctx2[6]) {
        set_input_value(
          input0,
          /*$query*/
          ctx2[6]
        );
      }
      if (dirty & /*$color*/
      128) {
        set_input_value(
          input1,
          /*$color*/
          ctx2[7]
        );
      }
      const actionbutton_changes = {};
      if (dirty & /*$$scope*/
      1048576) {
        actionbutton_changes.$$scope = { dirty, ctx: ctx2 };
      }
      actionbutton.$set(actionbutton_changes);
      if (!current || dirty & /*style*/
      1) {
        attr(
          fieldset,
          "style",
          /*style*/
          ctx2[0]
        );
      }
      if (!current || dirty & /*dragging, pushDown*/
      24 && fieldset_class_value !== (fieldset_class_value = "group " + /*dragging*/
      (ctx2[3] ? "dragging" : "") + " " + /*pushDown*/
      (ctx2[4] ? "pushDown" : "") + " svelte-17c5kxv")) {
        attr(fieldset, "class", fieldset_class_value);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(actionbutton.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(actionbutton.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(fieldset);
      }
      destroy_component(actionbutton);
      ctx[18](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$7($$self, $$props, $$invalidate) {
  let $query;
  let $color;
  let { style = "" } = $$props;
  let { group: group2 } = $$props;
  let { groups = void 0 } = $$props;
  let { dragging = false } = $$props;
  let { pushDown = false } = $$props;
  let { clientWidth = 0 } = $$props;
  let { clientHeight = 0 } = $$props;
  let { innerWidth = 0 } = $$props;
  let { innerHeight = 0 } = $$props;
  const dispatch2 = createEventDispatcher();
  const query = writable(group2.query);
  component_subscribe($$self, query, (value) => $$invalidate(6, $query = value));
  query.subscribe((newQuery) => {
    if (newQuery !== group2.query) {
      groups == null ? void 0 : groups.applyFileToGroup(group2.id, newQuery);
    }
  });
  const color = writable(group2.color);
  component_subscribe($$self, color, (value) => $$invalidate(7, $color = value));
  color.subscribe((newColor) => {
    if (newColor !== group2.color) {
      groups == null ? void 0 : groups.recolorGroup(group2.id, newColor);
    }
  });
  let element2;
  onMount(() => {
    if (element2 == null)
      return;
    new ResizeObserver(() => {
      if (element2 == null)
        return;
      $$invalidate(11, clientWidth = element2.clientWidth);
      $$invalidate(12, clientHeight = element2.clientHeight);
      $$invalidate(13, innerWidth = element2.innerWidth);
      $$invalidate(14, innerHeight = element2.innerHeight);
    }).observe(element2);
  });
  function primeDrag(event) {
    const offsetX = event.currentTarget.offsetLeft + event.offsetX;
    const offsetY = event.currentTarget.offsetTop + event.offsetY;
    dispatch2("primeDrag", { offsetX, offsetY });
  }
  function input0_input_handler() {
    $query = this.value;
    query.set($query);
  }
  function input1_input_handler() {
    $color = this.value;
    color.set($color);
  }
  const action_handler = () => groups == null ? void 0 : groups.removeGroup(group2.id);
  function fieldset_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      element2 = $$value;
      $$invalidate(5, element2);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("style" in $$props2)
      $$invalidate(0, style = $$props2.style);
    if ("group" in $$props2)
      $$invalidate(1, group2 = $$props2.group);
    if ("groups" in $$props2)
      $$invalidate(2, groups = $$props2.groups);
    if ("dragging" in $$props2)
      $$invalidate(3, dragging = $$props2.dragging);
    if ("pushDown" in $$props2)
      $$invalidate(4, pushDown = $$props2.pushDown);
    if ("clientWidth" in $$props2)
      $$invalidate(11, clientWidth = $$props2.clientWidth);
    if ("clientHeight" in $$props2)
      $$invalidate(12, clientHeight = $$props2.clientHeight);
    if ("innerWidth" in $$props2)
      $$invalidate(13, innerWidth = $$props2.innerWidth);
    if ("innerHeight" in $$props2)
      $$invalidate(14, innerHeight = $$props2.innerHeight);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*group*/
    2) {
      query.set(group2.query);
    }
    if ($$self.$$.dirty & /*group*/
    2) {
      color.set(group2.color);
    }
  };
  return [
    style,
    group2,
    groups,
    dragging,
    pushDown,
    element2,
    $query,
    $color,
    query,
    color,
    primeDrag,
    clientWidth,
    clientHeight,
    innerWidth,
    innerHeight,
    input0_input_handler,
    input1_input_handler,
    action_handler,
    fieldset_binding
  ];
}
class GroupForm extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$7, create_fragment$a, safe_not_equal, {
      style: 0,
      group: 1,
      groups: 2,
      dragging: 3,
      pushDown: 4,
      clientWidth: 11,
      clientHeight: 12,
      innerWidth: 13,
      innerHeight: 14
    });
  }
}
const Groups_svelte_svelte_type_style_lang = "";
const { Map: Map_1 } = globals;
function get_each_context_1$1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[34] = list[i];
  child_ctx[36] = i;
  return child_ctx;
}
function get_each_context$1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[34] = list[i];
  child_ctx[36] = i;
  return child_ctx;
}
function create_else_block(ctx) {
  let each_1_anchor;
  let current;
  let each_value_1 = ensure_array_like(
    /*groups*/
    ctx[3]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each_1_anchor = empty();
    },
    m(target, anchor) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(target, anchor);
        }
      }
      insert(target, each_1_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*groups, timelineItemGroups, groupFormWidth, groupFormHeight, groupFormInnerHeight, primeDrag*/
      4217) {
        each_value_1 = ensure_array_like(
          /*groups*/
          ctx2[3]
        );
        let i;
        for (i = 0; i < each_value_1.length; i += 1) {
          const child_ctx = get_each_context_1$1(ctx2, each_value_1, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block_1$1(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }
        group_outros();
        for (i = each_value_1.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      for (let i = 0; i < each_value_1.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(each_1_anchor);
      }
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_if_block_1$1(ctx) {
  let each_blocks = [];
  let each_1_lookup = new Map_1();
  let each_1_anchor;
  let current;
  let each_value = ensure_array_like(
    /*groups*/
    ctx[3].filter(
      /*func*/
      ctx[20]
    )
  );
  const get_key = (ctx2) => (
    /*index*/
    ctx2[36]
  );
  for (let i = 0; i < each_value.length; i += 1) {
    let child_ctx = get_each_context$1(ctx, each_value, i);
    let key = get_key(child_ctx);
    each_1_lookup.set(key, each_blocks[i] = create_each_block$1(key, child_ctx));
  }
  return {
    c() {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each_1_anchor = empty();
    },
    m(target, anchor) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(target, anchor);
        }
      }
      insert(target, each_1_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*groups, dragIndex, dragOverIndex*/
      392) {
        each_value = ensure_array_like(
          /*groups*/
          ctx2[3].filter(
            /*func*/
            ctx2[20]
          )
        );
        group_outros();
        each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx2, each_value, each_1_lookup, each_1_anchor.parentNode, outro_and_destroy_block, create_each_block$1, each_1_anchor, get_each_context$1);
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(each_1_anchor);
      }
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].d(detaching);
      }
    }
  };
}
function create_each_block_1$1(ctx) {
  let groupform;
  let updating_clientWidth;
  let updating_clientHeight;
  let updating_innerHeight;
  let current;
  function groupform_clientWidth_binding(value) {
    ctx[21](value);
  }
  function groupform_clientHeight_binding(value) {
    ctx[22](value);
  }
  function groupform_innerHeight_binding(value) {
    ctx[23](value);
  }
  function remove_handler() {
    return (
      /*remove_handler*/
      ctx[24](
        /*group*/
        ctx[34]
      )
    );
  }
  function primeDrag_handler(...args) {
    return (
      /*primeDrag_handler*/
      ctx[25](
        /*index*/
        ctx[36],
        ...args
      )
    );
  }
  let groupform_props = {
    group: (
      /*group*/
      ctx[34]
    ),
    groups: (
      /*timelineItemGroups*/
      ctx[0]
    )
  };
  if (
    /*groupFormWidth*/
    ctx[4] !== void 0
  ) {
    groupform_props.clientWidth = /*groupFormWidth*/
    ctx[4];
  }
  if (
    /*groupFormHeight*/
    ctx[5] !== void 0
  ) {
    groupform_props.clientHeight = /*groupFormHeight*/
    ctx[5];
  }
  if (
    /*groupFormInnerHeight*/
    ctx[6] !== void 0
  ) {
    groupform_props.innerHeight = /*groupFormInnerHeight*/
    ctx[6];
  }
  groupform = new GroupForm({ props: groupform_props });
  binding_callbacks.push(() => bind(groupform, "clientWidth", groupform_clientWidth_binding));
  binding_callbacks.push(() => bind(groupform, "clientHeight", groupform_clientHeight_binding));
  binding_callbacks.push(() => bind(groupform, "innerHeight", groupform_innerHeight_binding));
  groupform.$on("remove", remove_handler);
  groupform.$on("primeDrag", primeDrag_handler);
  return {
    c() {
      create_component(groupform.$$.fragment);
    },
    m(target, anchor) {
      mount_component(groupform, target, anchor);
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      const groupform_changes = {};
      if (dirty[0] & /*groups*/
      8)
        groupform_changes.group = /*group*/
        ctx[34];
      if (dirty[0] & /*timelineItemGroups*/
      1)
        groupform_changes.groups = /*timelineItemGroups*/
        ctx[0];
      if (!updating_clientWidth && dirty[0] & /*groupFormWidth*/
      16) {
        updating_clientWidth = true;
        groupform_changes.clientWidth = /*groupFormWidth*/
        ctx[4];
        add_flush_callback(() => updating_clientWidth = false);
      }
      if (!updating_clientHeight && dirty[0] & /*groupFormHeight*/
      32) {
        updating_clientHeight = true;
        groupform_changes.clientHeight = /*groupFormHeight*/
        ctx[5];
        add_flush_callback(() => updating_clientHeight = false);
      }
      if (!updating_innerHeight && dirty[0] & /*groupFormInnerHeight*/
      64) {
        updating_innerHeight = true;
        groupform_changes.innerHeight = /*groupFormInnerHeight*/
        ctx[6];
        add_flush_callback(() => updating_innerHeight = false);
      }
      groupform.$set(groupform_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(groupform.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(groupform.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(groupform, detaching);
    }
  };
}
function create_each_block$1(key_1, ctx) {
  let first;
  let groupform;
  let current;
  groupform = new GroupForm({
    props: {
      group: (
        /*group*/
        ctx[34]
      ),
      pushDown: (
        /*dragOverIndex*/
        ctx[8] >= 0 && /*index*/
        ctx[36] >= /*dragOverIndex*/
        ctx[8]
      )
    }
  });
  return {
    key: key_1,
    first: null,
    c() {
      first = empty();
      create_component(groupform.$$.fragment);
      this.first = first;
    },
    m(target, anchor) {
      insert(target, first, anchor);
      mount_component(groupform, target, anchor);
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      const groupform_changes = {};
      if (dirty[0] & /*groups, dragIndex*/
      136)
        groupform_changes.group = /*group*/
        ctx[34];
      if (dirty[0] & /*dragOverIndex, groups, dragIndex*/
      392)
        groupform_changes.pushDown = /*dragOverIndex*/
        ctx[8] >= 0 && /*index*/
        ctx[36] >= /*dragOverIndex*/
        ctx[8];
      groupform.$set(groupform_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(groupform.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(groupform.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(first);
      }
      destroy_component(groupform, detaching);
    }
  };
}
function create_default_slot_1(ctx) {
  let t;
  return {
    c() {
      t = text("New group");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}
function create_default_slot$2(ctx) {
  let div0;
  let current_block_type_index;
  let if_block;
  let t;
  let div1;
  let actionbutton;
  let current;
  let mounted;
  let dispose;
  const if_block_creators = [create_if_block_1$1, create_else_block];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*dragIndex*/
      ctx2[7] >= 0
    )
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  actionbutton = new ActionButton({
    props: {
      class: "mod-cta",
      $$slots: { default: [create_default_slot_1] },
      $$scope: { ctx }
    }
  });
  actionbutton.$on(
    "action",
    /*action_handler*/
    ctx[26]
  );
  return {
    c() {
      div0 = element("div");
      if_block.c();
      t = space();
      div1 = element("div");
      create_component(actionbutton.$$.fragment);
      attr(div0, "class", "group-list svelte-134nxms");
      attr(div0, "role", "list");
      set_style(
        div0,
        "--form-height",
        /*groupFormHeight*/
        ctx[5] + "px"
      );
      toggle_class(
        div0,
        "dragging",
        /*dragIndex*/
        ctx[7] >= 0
      );
      attr(div1, "class", "graph-color-button-container svelte-134nxms");
    },
    m(target, anchor) {
      insert(target, div0, anchor);
      if_blocks[current_block_type_index].m(div0, null);
      insert(target, t, anchor);
      insert(target, div1, anchor);
      mount_component(actionbutton, div1, null);
      current = true;
      if (!mounted) {
        dispose = listen(
          div0,
          "mousemove",
          /*relativeMouseMove*/
          ctx[13]
        );
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(div0, null);
      }
      if (!current || dirty[0] & /*groupFormHeight*/
      32) {
        set_style(
          div0,
          "--form-height",
          /*groupFormHeight*/
          ctx2[5] + "px"
        );
      }
      if (!current || dirty[0] & /*dragIndex*/
      128) {
        toggle_class(
          div0,
          "dragging",
          /*dragIndex*/
          ctx2[7] >= 0
        );
      }
      const actionbutton_changes = {};
      if (dirty[1] & /*$$scope*/
      128) {
        actionbutton_changes.$$scope = { dirty, ctx: ctx2 };
      }
      actionbutton.$set(actionbutton_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      transition_in(actionbutton.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      transition_out(actionbutton.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div0);
        detach(t);
        detach(div1);
      }
      if_blocks[current_block_type_index].d();
      destroy_component(actionbutton);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block$2(ctx) {
  let dialog;
  let groupform;
  let current;
  groupform = new GroupForm({
    props: {
      group: (
        /*groups*/
        ctx[3][
          /*dragIndex*/
          ctx[7]
        ]
      )
    }
  });
  return {
    c() {
      dialog = element("dialog");
      create_component(groupform.$$.fragment);
      dialog.open = true;
      set_style(
        dialog,
        "top",
        /*dragImgPos*/
        ctx[9].top + "px"
      );
      set_style(
        dialog,
        "left",
        /*dragImgPos*/
        ctx[9].left + "px"
      );
      attr(dialog, "class", "svelte-134nxms");
    },
    m(target, anchor) {
      insert(target, dialog, anchor);
      mount_component(groupform, dialog, null);
      ctx[28](dialog);
      current = true;
    },
    p(ctx2, dirty) {
      const groupform_changes = {};
      if (dirty[0] & /*groups, dragIndex*/
      136)
        groupform_changes.group = /*groups*/
        ctx2[3][
          /*dragIndex*/
          ctx2[7]
        ];
      groupform.$set(groupform_changes);
      if (!current || dirty[0] & /*dragImgPos*/
      512) {
        set_style(
          dialog,
          "top",
          /*dragImgPos*/
          ctx2[9].top + "px"
        );
      }
      if (!current || dirty[0] & /*dragImgPos*/
      512) {
        set_style(
          dialog,
          "left",
          /*dragImgPos*/
          ctx2[9].left + "px"
        );
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(groupform.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(groupform.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(dialog);
      }
      destroy_component(groupform);
      ctx[28](null);
    }
  };
}
function create_fragment$9(ctx) {
  let collapsablesection;
  let updating_collapsed;
  let t;
  let if_block_anchor;
  let current;
  function collapsablesection_collapsed_binding(value) {
    ctx[27](value);
  }
  let collapsablesection_props = {
    name: (
      /*name*/
      ctx[1]
    ),
    $$slots: { default: [create_default_slot$2] },
    $$scope: { ctx }
  };
  if (
    /*$collapsed*/
    ctx[10] !== void 0
  ) {
    collapsablesection_props.collapsed = /*$collapsed*/
    ctx[10];
  }
  collapsablesection = new CollapsableSection({ props: collapsablesection_props });
  binding_callbacks.push(() => bind(collapsablesection, "collapsed", collapsablesection_collapsed_binding));
  let if_block = (
    /*dragIndex*/
    ctx[7] >= 0 && create_if_block$2(ctx)
  );
  return {
    c() {
      create_component(collapsablesection.$$.fragment);
      t = space();
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      mount_component(collapsablesection, target, anchor);
      insert(target, t, anchor);
      if (if_block)
        if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const collapsablesection_changes = {};
      if (dirty[0] & /*name*/
      2)
        collapsablesection_changes.name = /*name*/
        ctx2[1];
      if (dirty[0] & /*timelineItemGroups, groupFormHeight, dragIndex, groups, dragOverIndex, groupFormWidth, groupFormInnerHeight*/
      505 | dirty[1] & /*$$scope*/
      128) {
        collapsablesection_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_collapsed && dirty[0] & /*$collapsed*/
      1024) {
        updating_collapsed = true;
        collapsablesection_changes.collapsed = /*$collapsed*/
        ctx2[10];
        add_flush_callback(() => updating_collapsed = false);
      }
      collapsablesection.$set(collapsablesection_changes);
      if (
        /*dragIndex*/
        ctx2[7] >= 0
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty[0] & /*dragIndex*/
          128) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$2(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(collapsablesection.$$.fragment, local);
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(collapsablesection.$$.fragment, local);
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t);
        detach(if_block_anchor);
      }
      destroy_component(collapsablesection, detaching);
      if (if_block)
        if_block.d(detaching);
    }
  };
}
function instance$6($$self, $$props, $$invalidate) {
  let $collapsed;
  let { timelineItemGroups } = $$props;
  let { name } = $$props;
  let { viewModel } = $$props;
  const collapsed = viewModel.make("collapsed", true);
  component_subscribe($$self, collapsed, (value) => $$invalidate(10, $collapsed = value));
  const groupById = /* @__PURE__ */ new Map();
  let groups = [...timelineItemGroups.listGroups()];
  groups.forEach((group2) => groupById.set(group2.id, group2));
  function addGroup(group2) {
    groupById.set(group2.id, group2);
    groups.push(group2);
    $$invalidate(3, groups);
  }
  function recolorGroup2(group2) {
    groupById.set(group2.id, group2);
    $$invalidate(3, groups = groups.map(({ id }) => groupById.get(id)));
  }
  function changeGroupQuery(group2) {
    groupById.set(group2.id, group2);
    $$invalidate(3, groups = groups.map(({ id }) => groupById.get(id)));
  }
  function removeGroup2(groupId) {
    groupById.delete(groupId);
    $$invalidate(3, groups = groups.filter(({ id }) => id !== groupId).map(({ id }) => groupById.get(id)));
  }
  function newOrder(newGroups) {
    groupById.clear();
    newGroups.forEach((group2) => groupById.set(group2.id, group2));
    $$invalidate(3, groups = [...newGroups]);
  }
  let groupFormWidth = 0;
  let groupFormHeight = 0;
  let groupFormInnerHeight = 0;
  let primedDragIndex = -1;
  let dragIndex = -1;
  let dragOverIndex = -1;
  let dragHandle = { offsetX: 0, offsetY: 0 };
  let dragImgPos = { top: 0, left: 0 };
  function primeDrag(index, position) {
    primedDragIndex = index;
    dragHandle = position;
    $$invalidate(9, dragImgPos = {
      left: position.offsetX,
      top: position.offsetY
    });
    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", endDrag);
  }
  function mousemove(event) {
    $$invalidate(7, dragIndex = primedDragIndex);
    $$invalidate(9, dragImgPos = {
      top: event.pageY - dragHandle.offsetY,
      left: event.pageX - dragHandle.offsetX
    });
  }
  function endDrag() {
    window.removeEventListener("mousemove", mousemove);
    window.removeEventListener("mouseup", endDrag);
    timelineItemGroups.reorderGroup(groups[dragIndex].id, dragOverIndex);
    $$invalidate(7, dragIndex = -1);
    $$invalidate(8, dragOverIndex = -1);
  }
  function relativeMouseMove(event) {
    if (dragIndex < 0)
      return;
    const currentTargetY = event.pageY - event.currentTarget.getBoundingClientRect().top;
    $$invalidate(8, dragOverIndex = Math.floor(currentTargetY / groupFormHeight));
  }
  let dragDialog;
  const func = (_, index) => index !== dragIndex;
  function groupform_clientWidth_binding(value) {
    groupFormWidth = value;
    $$invalidate(4, groupFormWidth);
  }
  function groupform_clientHeight_binding(value) {
    groupFormHeight = value;
    $$invalidate(5, groupFormHeight);
  }
  function groupform_innerHeight_binding(value) {
    groupFormInnerHeight = value;
    $$invalidate(6, groupFormInnerHeight);
  }
  const remove_handler = (group2) => timelineItemGroups.removeGroup(group2.id);
  const primeDrag_handler = (index, { detail }) => primeDrag(index, detail);
  const action_handler = () => timelineItemGroups.createNewGroup();
  function collapsablesection_collapsed_binding(value) {
    $collapsed = value;
    collapsed.set($collapsed);
  }
  function dialog_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      dragDialog = $$value;
      $$invalidate(2, dragDialog);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("timelineItemGroups" in $$props2)
      $$invalidate(0, timelineItemGroups = $$props2.timelineItemGroups);
    if ("name" in $$props2)
      $$invalidate(1, name = $$props2.name);
    if ("viewModel" in $$props2)
      $$invalidate(14, viewModel = $$props2.viewModel);
  };
  $$self.$$.update = () => {
    var _a, _b;
    if ($$self.$$.dirty[0] & /*dragDialog*/
    4) {
      if (dragDialog != null) {
        if (dragDialog.parentElement != dragDialog.ownerDocument.body) {
          (_b = (_a = dragDialog.ownerDocument) == null ? void 0 : _a.body) == null ? void 0 : _b.appendChild(dragDialog);
        }
      }
    }
  };
  return [
    timelineItemGroups,
    name,
    dragDialog,
    groups,
    groupFormWidth,
    groupFormHeight,
    groupFormInnerHeight,
    dragIndex,
    dragOverIndex,
    dragImgPos,
    $collapsed,
    collapsed,
    primeDrag,
    relativeMouseMove,
    viewModel,
    addGroup,
    recolorGroup2,
    changeGroupQuery,
    removeGroup2,
    newOrder,
    func,
    groupform_clientWidth_binding,
    groupform_clientHeight_binding,
    groupform_innerHeight_binding,
    remove_handler,
    primeDrag_handler,
    action_handler,
    collapsablesection_collapsed_binding,
    dialog_binding
  ];
}
class Groups extends SvelteComponent {
  constructor(options) {
    super();
    init(
      this,
      options,
      instance$6,
      create_fragment$9,
      safe_not_equal,
      {
        timelineItemGroups: 0,
        name: 1,
        viewModel: 14,
        addGroup: 15,
        recolorGroup: 16,
        changeGroupQuery: 17,
        removeGroup: 18,
        newOrder: 19
      },
      null,
      [-1, -1]
    );
  }
  get addGroup() {
    return this.$$.ctx[15];
  }
  get recolorGroup() {
    return this.$$.ctx[16];
  }
  get changeGroupQuery() {
    return this.$$.ctx[17];
  }
  get removeGroup() {
    return this.$$.ctx[18];
  }
  get newOrder() {
    return this.$$.ctx[19];
  }
}
async function selectGroupForFile(groups, file) {
  for (const group2 of groups) {
    if (await group2.filter.matches(file)) {
      return group2;
    }
  }
}
const processLog = () => {
};
let latestProcessId = 0;
function longProcess(items, processItem) {
  const processInstance = new LongProcess(++latestProcessId, processItem);
  processInstance.processBatch(0, items);
  return processInstance;
}
class LongProcess {
  constructor(id, processItem) {
    __publicField(this, "processing", true);
    __publicField(this, "_completion");
    __publicField(this, "_resolve");
    __publicField(this, "_reject");
    this.id = id;
    this.processItem = processItem;
  }
  stop() {
    this.processing = false;
  }
  completion() {
    if (this._completion == null) {
      this._completion = new Promise((resolve, reject) => {
        this._resolve = resolve;
        this._reject = reject;
      });
    }
    return this._completion;
  }
  async processBatch(i, items, previousProcesses = []) {
    var _a, _b;
    const start = performance.now();
    if (previousProcesses.length > 0) {
      await Promise.all(previousProcesses);
    }
    const processes = [];
    for (i; i < items.length; i++) {
      if (!this.processing) {
        processLog(`  [${this.id}] CANCELLED`);
        (_a = this._reject) == null ? void 0 : _a.call(null, "Cancelled");
        return;
      }
      processes.push(this.processItem(items[i]));
      const elapsedTime = performance.now() - start;
      if (elapsedTime >= 16) {
        break;
      }
    }
    if (i < items.length) {
      setTimeout(() => this.processBatch(i, items, processes), 0);
    } else {
      processLog(`[${this.id}] COMPLETE`);
      (_b = this._resolve) == null ? void 0 : _b.call(null, void 0);
    }
  }
}
async function applyFileToGroup(groupId, query, output) {
  var _a;
  const group2 = this.groups.getGroup(groupId);
  if (group2 == null)
    return;
  const order = this.groups.getOrder();
  const groupIndex = order.indexOf(groupId);
  if (groupIndex < 0)
    return;
  let dependentGroups = order.slice(groupIndex);
  (_a = this.recolorProcess) == null ? void 0 : _a.stop();
  this.recolorProcess = void 0;
  group2.query = query;
  this.groups.saveGroup(group2);
  output.presentRequeriedGroup(group2);
  const groups = this.groups.list();
  const selectGroup = selectGroupForFile.bind(null, groups);
  const affectedItems = this.items.list().filter((item) => {
    const itemGroup = item.group();
    return itemGroup == null || dependentGroups.includes(itemGroup);
  });
  for (const item of affectedItems) {
    item.forgetGroup();
  }
  const process = longProcess(affectedItems, async (item) => {
    const group22 = await selectGroup(item.obsidianFile);
    item.applyGroup(group22);
    output.presentRecoloredItem(item);
  });
  this.recolorProcess = process;
  try {
    await process.completion();
  } catch (e) {
    if (typeof e === "string" && e === "Cancelled")
      ;
    else {
      throw e;
    }
  }
  this.recolorProcess = void 0;
}
function recolorGroup(groupId, color, output) {
  var _a;
  const group2 = this.groups.getGroup(groupId);
  if (group2 == null)
    return;
  (_a = this.recolorProcess) == null ? void 0 : _a.stop();
  this.recolorProcess = void 0;
  group2.color = color;
  this.groups.saveGroup(group2);
  output.presentRecoloredGroup(group2);
  const items = this.items.list().filter((it) => it.group() === groupId);
  for (const item of items) {
    item.applyGroup(group2);
  }
  output.presentRecoloredItems(items);
}
async function removeGroup(groupId, output) {
  var _a;
  if (!this.groups.removeGroup(groupId)) {
    return;
  }
  (_a = this.recolorProcess) == null ? void 0 : _a.stop();
  this.recolorProcess = void 0;
  const groups = this.groups.list();
  output.hideGroup(groupId);
  const items = this.items.list().filter((it) => it.group() === groupId || it.group() == null);
  for (const item of items) {
    item.forgetGroup();
  }
  const selectGroup = selectGroupForFile.bind(null, groups);
  const process = longProcess(items, async (item) => {
    const group2 = await selectGroup(item.obsidianFile);
    item.applyGroup(group2);
    output.presentRecoloredItem(item);
  });
  this.recolorProcess = process;
  try {
    await process.completion();
  } catch (e) {
    if (typeof e === "string" && e === "Cancelled")
      ;
    else {
      throw e;
    }
  }
  this.recolorProcess = void 0;
}
function listExistingGroups(output) {
  const groups = this.groups.list();
  output.presentGroups(groups);
}
const defaultGroupColors = [
  "#e05252",
  "#e0b152",
  "#b1e052",
  "#52e052",
  "#52e0b1",
  "#52b1e0",
  "#5252e0",
  "#b152e0",
  "#e052b1"
];
async function createNewGroup(output) {
  const color = defaultGroupColors[this.groups.list().length % defaultGroupColors.length];
  const group2 = this.groups.addNewGroup({ query: "", color });
  this.groups.list();
  output.presentNewGroup(group2);
}
async function reorderGroup(groupId, toIndex, output) {
  var _a;
  const order = this.groups.getOrder();
  const index = order.indexOf(groupId);
  if (index < 0) {
    return;
  }
  (_a = this.recolorProcess) == null ? void 0 : _a.stop();
  this.recolorProcess = void 0;
  const newOrder = order.toSpliced(index, 1);
  newOrder.splice(toIndex, 0, groupId);
  this.groups.setOrder(newOrder);
  const groups = this.groups.list();
  output.presentReorderedGroups(groups);
  for (const item of this.items.list()) {
    item.forgetGroup();
  }
  const selectGroup = selectGroupForFile.bind(null, groups);
  const process = longProcess(this.items.list(), async (item) => {
    const group2 = await selectGroup(item.obsidianFile);
    item.applyGroup(group2);
    output.presentRecoloredItem(item);
  });
  this.recolorProcess = process;
  try {
    await process.completion();
  } catch (e) {
    if (typeof e === "string" && e === "Cancelled")
      ;
    else {
      throw e;
    }
  }
  this.recolorProcess = void 0;
}
function makeTimelineItemGroups(context, output) {
  return new TimelineItemGroupsImpl(
    context,
    output
  );
}
class TimelineItemGroupsImpl {
  constructor(context, output) {
    this.context = context;
    this.output = output;
  }
  createNewGroup() {
    createNewGroup.call(this.context, this.output);
  }
  applyFileToGroup(groupId, query) {
    applyFileToGroup.call(this.context, groupId, query, this.output);
  }
  recolorGroup(groupId, color) {
    recolorGroup.call(this.context, groupId, color, this.output);
  }
  removeGroup(groupId) {
    removeGroup.call(this.context, groupId, this.output);
  }
  reorderGroup(groupId, toIndex) {
    reorderGroup.call(this.context, groupId, toIndex, this.output);
  }
  listGroups() {
    let receivedGroups = [];
    listExistingGroups.call(this.context, {
      presentGroups(groups) {
        receivedGroups = groups;
      }
    });
    return receivedGroups;
  }
}
class GroupRepository {
  constructor(storedGroups, notes) {
    __publicField(this, "order", []);
    __publicField(this, "groups", /* @__PURE__ */ new Map());
    __publicField(this, "nextId");
    this.storedGroups = storedGroups;
    this.notes = notes;
    get_store_value(storedGroups).forEach((storedGroup2, index) => {
      const id = index.toString();
      const group2 = new TimelineFileItemGroup(id, notes, storedGroup2);
      this.order.push(id);
      this.groups.set(id, group2);
    });
    this.nextId = this.groups.size;
  }
  getOrder() {
    return this.order;
  }
  addNewGroup(data) {
    this.nextId++;
    const group2 = new TimelineFileItemGroup(
      this.nextId.toString(),
      this.notes,
      data
    );
    this.groups.set(group2.id, group2);
    this.order.push(group2.id);
    this.storedGroups.update((currentStoredGroups) => {
      currentStoredGroups.push(data);
      return currentStoredGroups;
    });
    return group2;
  }
  getGroup(groupId) {
    return this.groups.get(groupId);
  }
  saveGroup(groupToSave) {
    if (this.groups.has(groupToSave.id)) {
      this.storedGroups.update(() => {
        return this.order.map((id) => this.groups.get(id)).map(storedGroup);
      });
    }
  }
  removeGroup(groupId) {
    if (this.groups.has(groupId)) {
      this.groups.delete(groupId);
      this.order.splice(this.order.indexOf(groupId), 1);
      this.storedGroups.update(() => {
        return this.order.map((id) => this.groups.get(id)).map(storedGroup);
      });
      return true;
    }
    return false;
  }
  setOrder(order) {
    this.order = [...order];
  }
  list() {
    return this.order.map((id) => this.groups.get(id));
  }
}
function storedGroup(group2) {
  return {
    color: group2.color,
    query: group2.query
  };
}
class TimelineFileItemGroup {
  constructor(id, notes, from) {
    __publicField(this, "_filter");
    __publicField(this, "_query");
    __publicField(this, "color");
    this.id = id;
    this.notes = notes;
    this.color = from.color;
    this._query = from.query;
    this._filter = notes.getExclusiveNoteFilterForQuery(from.query);
  }
  get query() {
    return this._query;
  }
  set query(query) {
    this._query = query;
    this._filter = this.notes.getExclusiveNoteFilterForQuery(query);
  }
  get filter() {
    return this._filter;
  }
}
const Row_svelte_svelte_type_style_lang = "";
const Select_svelte_svelte_type_style_lang = "";
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[24] = list[i];
  child_ctx[26] = i;
  return child_ctx;
}
const get_item_slot_changes_1 = (dirty) => ({});
const get_item_slot_context_1 = (ctx) => ({ index: (
  /*itemIndex*/
  ctx[26]
) });
function get_each_context_1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[24] = list[i];
  child_ctx[26] = i;
  return child_ctx;
}
const get_item_slot_changes = (dirty) => ({});
const get_item_slot_context = (ctx) => ({ index: (
  /*itemIndex*/
  ctx[26]
) });
function create_each_block_1(ctx) {
  let option;
  let t;
  let option_selected_value;
  let current;
  const item_slot_template = (
    /*#slots*/
    ctx[15].item
  );
  const item_slot = create_slot(
    item_slot_template,
    ctx,
    /*$$scope*/
    ctx[14],
    get_item_slot_context
  );
  return {
    c() {
      option = element("option");
      if (item_slot)
        item_slot.c();
      t = space();
      option.__value = /*itemIndex*/
      ctx[26];
      set_input_value(option, option.__value);
      option.selected = option_selected_value = /*selectedIndex*/
      ctx[0] === /*itemIndex*/
      ctx[26];
    },
    m(target, anchor) {
      insert(target, option, anchor);
      if (item_slot) {
        item_slot.m(option, null);
      }
      append(option, t);
      current = true;
    },
    p(ctx2, dirty) {
      if (item_slot) {
        if (item_slot.p && (!current || dirty & /*$$scope*/
        16384)) {
          update_slot_base(
            item_slot,
            item_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[14],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[14]
            ) : get_slot_changes(
              item_slot_template,
              /*$$scope*/
              ctx2[14],
              dirty,
              get_item_slot_changes
            ),
            get_item_slot_context
          );
        }
      }
      if (!current || dirty & /*selectedIndex*/
      1 && option_selected_value !== (option_selected_value = /*selectedIndex*/
      ctx2[0] === /*itemIndex*/
      ctx2[26])) {
        option.selected = option_selected_value;
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(item_slot, local);
      current = true;
    },
    o(local) {
      transition_out(item_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(option);
      }
      if (item_slot)
        item_slot.d(detaching);
    }
  };
}
function create_if_block$1(ctx) {
  let dialog_1;
  let ul;
  let dialog_1_data_popupfor_value;
  let current;
  let each_value = ensure_array_like(new Array(
    /*itemCount*/
    ctx[1]
  ).fill(0));
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      dialog_1 = element("dialog");
      ul = element("ul");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(ul, "role", "listbox");
      attr(ul, "class", "svelte-1tt3zkr");
      attr(
        dialog_1,
        "id",
        /*dialogId*/
        ctx[7]
      );
      dialog_1.open = /*open*/
      ctx[2];
      attr(dialog_1, "class", "select-dropdown svelte-1tt3zkr");
      attr(dialog_1, "data-popupfor", dialog_1_data_popupfor_value = /*$$restProps*/
      ctx[9].id);
    },
    m(target, anchor) {
      insert(target, dialog_1, anchor);
      append(dialog_1, ul);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(ul, null);
        }
      }
      ctx[19](dialog_1);
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty & /*$$scope, itemCount*/
      16386) {
        each_value = ensure_array_like(new Array(
          /*itemCount*/
          ctx2[1]
        ).fill(0));
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(ul, null);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
      if (!current || dirty & /*open*/
      4) {
        dialog_1.open = /*open*/
        ctx2[2];
      }
      if (!current || dirty & /*$$restProps*/
      512 && dialog_1_data_popupfor_value !== (dialog_1_data_popupfor_value = /*$$restProps*/
      ctx2[9].id)) {
        attr(dialog_1, "data-popupfor", dialog_1_data_popupfor_value);
      }
    },
    i(local) {
      if (current)
        return;
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(dialog_1);
      }
      destroy_each(each_blocks, detaching);
      ctx[19](null);
    }
  };
}
function create_each_block(ctx) {
  let current;
  const item_slot_template = (
    /*#slots*/
    ctx[15].item
  );
  const item_slot = create_slot(
    item_slot_template,
    ctx,
    /*$$scope*/
    ctx[14],
    get_item_slot_context_1
  );
  return {
    c() {
      if (item_slot)
        item_slot.c();
    },
    m(target, anchor) {
      if (item_slot) {
        item_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (item_slot) {
        if (item_slot.p && (!current || dirty & /*$$scope*/
        16384)) {
          update_slot_base(
            item_slot,
            item_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[14],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[14]
            ) : get_slot_changes(
              item_slot_template,
              /*$$scope*/
              ctx2[14],
              dirty,
              get_item_slot_changes_1
            ),
            get_item_slot_context_1
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(item_slot, local);
      current = true;
    },
    o(local) {
      transition_out(item_slot, local);
      current = false;
    },
    d(detaching) {
      if (item_slot)
        item_slot.d(detaching);
    }
  };
}
function create_fragment$8(ctx) {
  let select;
  let t;
  let if_block_anchor;
  let current;
  let mounted;
  let dispose;
  let each_value_1 = ensure_array_like(new Array(
    /*itemCount*/
    ctx[1]
  ).fill(0));
  let each_blocks = [];
  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  let select_levels = [
    /*$$restProps*/
    ctx[9],
    { role: "combobox" },
    { "aria-expanded": (
      /*open*/
      ctx[2]
    ) },
    { "aria-owns": (
      /*dialogId*/
      ctx[7]
    ) },
    { "aria-controls": (
      /*dialogId*/
      ctx[7]
    ) }
  ];
  let select_data = {};
  for (let i = 0; i < select_levels.length; i += 1) {
    select_data = assign(select_data, select_levels[i]);
  }
  let if_block = (
    /*open*/
    (ctx[2] || false) && create_if_block$1(ctx)
  );
  return {
    c() {
      select = element("select");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t = space();
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
      set_attributes(select, select_data);
      toggle_class(select, "dropdown", true);
    },
    m(target, anchor) {
      insert(target, select, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(select, null);
        }
      }
      "value" in select_data && (select_data.multiple ? select_options : select_option)(select, select_data.value);
      if (select.autofocus)
        select.focus();
      ctx[18](select);
      insert(target, t, anchor);
      if (if_block)
        if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
      if (!mounted) {
        dispose = [
          listen(select, "mousedown", stop_propagation(prevent_default(
            /*trigger*/
            ctx[8]
          ))),
          listen(
            select,
            "keydown",
            /*keydown_handler*/
            ctx[16]
          ),
          listen(
            select,
            "focusout",
            /*onFocusOut*/
            ctx[6]
          ),
          listen(
            select,
            "change",
            /*change_handler*/
            ctx[17]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & /*selectedIndex, $$scope, itemCount*/
      16387) {
        each_value_1 = ensure_array_like(new Array(
          /*itemCount*/
          ctx2[1]
        ).fill(0));
        let i;
        for (i = 0; i < each_value_1.length; i += 1) {
          const child_ctx = get_each_context_1(ctx2, each_value_1, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block_1(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(select, null);
          }
        }
        group_outros();
        for (i = each_value_1.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
      set_attributes(select, select_data = get_spread_update(select_levels, [
        dirty & /*$$restProps*/
        512 && /*$$restProps*/
        ctx2[9],
        { role: "combobox" },
        (!current || dirty & /*open*/
        4) && { "aria-expanded": (
          /*open*/
          ctx2[2]
        ) },
        { "aria-owns": (
          /*dialogId*/
          ctx2[7]
        ) },
        { "aria-controls": (
          /*dialogId*/
          ctx2[7]
        ) }
      ]));
      if (dirty & /*$$restProps, open, dialogId*/
      644 && "value" in select_data)
        (select_data.multiple ? select_options : select_option)(select, select_data.value);
      toggle_class(select, "dropdown", true);
      if (
        /*open*/
        ctx2[2] || false
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*open*/
          4) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$1(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      for (let i = 0; i < each_value_1.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      transition_in(if_block);
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(select);
        detach(t);
        detach(if_block_anchor);
      }
      destroy_each(each_blocks, detaching);
      ctx[18](null);
      if (if_block)
        if_block.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
function descendsFrom(potentialDescendant, potentialAnscestor) {
  let node = potentialDescendant;
  while (node != null) {
    if (node == potentialAnscestor) {
      return true;
    }
    node = node.parentElement;
  }
  return false;
}
function instance$5($$self, $$props, $$invalidate) {
  const omit_props_names = ["selectedIndex", "itemCount", "show", "hide", "toggleShown", "getDialog"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  const dispatch2 = createEventDispatcher();
  let { selectedIndex = -1 } = $$props;
  let { itemCount = 0 } = $$props;
  let { "aria-disabled": disabled } = $$restProps;
  let open = false;
  let element2;
  let buttonBounds;
  function show(causedBy) {
    if (!disabled && !open && itemCount > 0 && dispatch2("showing", causedBy, { cancelable: true })) {
      if (element2 != null) {
        buttonBounds = element2.getBoundingClientRect();
      }
      $$invalidate(2, open = true);
      dispatch2("shown", causedBy);
    }
  }
  function hide(causedBy) {
    if (!disabled && open && dispatch2("hiding", causedBy, { cancelable: true })) {
      $$invalidate(2, open = false);
      dispatch2("hidden", causedBy);
    }
  }
  function toggleShown(causedBy) {
    if (open) {
      hide(causedBy);
    } else {
      show(causedBy);
    }
  }
  let dialog;
  function getDialog() {
    return open ? dialog : void 0;
  }
  function positionDialog(dialog2) {
    if (dialog2.parentElement != document.body) {
      document.body.appendChild(dialog2);
    }
    const { width, height } = window.visualViewport;
    const dialogBounds = dialog2.getBoundingClientRect();
    if (buttonBounds != null) {
      dialog2.setCssStyles({
        left: `${Math.min(buttonBounds.x, width - dialogBounds.width)}px`,
        top: `${Math.min(buttonBounds.y + buttonBounds.height, height - dialogBounds.height)}px`,
        width: buttonBounds.width > dialogBounds.width ? `${buttonBounds.width}px` : void 0
      });
    } else {
      dialog2.setCssStyles({
        left: `${Math.max(0, (width - dialogBounds.width) / 2)}px`,
        top: `${Math.max(0, (height - dialogBounds.height) / 2)}px`
      });
    }
  }
  function onFocusOut(event) {
    if (dialog == null) {
      return;
    }
    const focusMovedTo = event.relatedTarget;
    if (focusMovedTo == null || !(focusMovedTo instanceof Node) || !descendsFrom(focusMovedTo, dialog)) {
      hide();
    } else {
      if (element2 != null) {
        element2.focus();
      }
    }
  }
  const dialogId = "select-dropdown-" + Math.random().toString(36).slice(2);
  function trigger(event) {
    event.preventDefault();
    toggleShown();
  }
  const keydown_handler = (event) => event.key === "Enter" ? trigger(event) : null;
  const change_handler = (event) => dispatch2("change", event.currentTarget.selectedIndex);
  function select_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      element2 = $$value;
      $$invalidate(4, element2);
    });
  }
  function dialog_1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      dialog = $$value;
      $$invalidate(3, dialog);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(9, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("selectedIndex" in $$new_props)
      $$invalidate(0, selectedIndex = $$new_props.selectedIndex);
    if ("itemCount" in $$new_props)
      $$invalidate(1, itemCount = $$new_props.itemCount);
    if ("$$scope" in $$new_props)
      $$invalidate(14, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*open*/
    4)
      ;
    if ($$self.$$.dirty & /*open, dialog*/
    12) {
      if (open && dialog != null)
        positionDialog(dialog);
    }
  };
  return [
    selectedIndex,
    itemCount,
    open,
    dialog,
    element2,
    dispatch2,
    onFocusOut,
    dialogId,
    trigger,
    $$restProps,
    show,
    hide,
    toggleShown,
    getDialog,
    $$scope,
    slots,
    keydown_handler,
    change_handler,
    select_binding,
    dialog_1_binding
  ];
}
class Select extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$5, create_fragment$8, safe_not_equal, {
      selectedIndex: 0,
      itemCount: 1,
      show: 10,
      hide: 11,
      toggleShown: 12,
      getDialog: 13
    });
  }
  get show() {
    return this.$$.ctx[10];
  }
  get hide() {
    return this.$$.ctx[11];
  }
  get toggleShown() {
    return this.$$.ctx[12];
  }
  get getDialog() {
    return this.$$.ctx[13];
  }
}
function create_fragment$7(ctx) {
  let svg;
  let circle;
  let polyline;
  return {
    c() {
      svg = svg_element("svg");
      circle = svg_element("circle");
      polyline = svg_element("polyline");
      attr(circle, "cx", "12");
      attr(circle, "cy", "12");
      attr(circle, "r", "10");
      attr(polyline, "points", "12 6 12 12 16 14");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg, "width", "24");
      attr(svg, "height", "24");
      attr(svg, "viewBox", "0 0 24 24");
      attr(svg, "fill", "none");
      attr(svg, "stroke", "currentColor");
      attr(svg, "stroke-width", "2");
      attr(svg, "stroke-linecap", "round");
      attr(svg, "stroke-linejoin", "round");
      attr(svg, "class", "svg-icon lucide-clock");
    },
    m(target, anchor) {
      insert(target, svg, anchor);
      append(svg, circle);
      append(svg, polyline);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(svg);
      }
    }
  };
}
class DateTimeIcon extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment$7, safe_not_equal, {});
  }
}
function create_fragment$6(ctx) {
  let svg;
  let rect;
  let line0;
  let line1;
  let line2;
  return {
    c() {
      svg = svg_element("svg");
      rect = svg_element("rect");
      line0 = svg_element("line");
      line1 = svg_element("line");
      line2 = svg_element("line");
      attr(rect, "x", "3");
      attr(rect, "y", "4");
      attr(rect, "width", "18");
      attr(rect, "height", "18");
      attr(rect, "rx", "2");
      attr(rect, "ry", "2");
      attr(line0, "x1", "16");
      attr(line0, "y1", "2");
      attr(line0, "x2", "16");
      attr(line0, "y2", "6");
      attr(line1, "x1", "8");
      attr(line1, "y1", "2");
      attr(line1, "x2", "8");
      attr(line1, "y2", "6");
      attr(line2, "x1", "3");
      attr(line2, "y1", "10");
      attr(line2, "x2", "21");
      attr(line2, "y2", "10");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg, "width", "24");
      attr(svg, "height", "24");
      attr(svg, "viewBox", "0 0 24 24");
      attr(svg, "fill", "none");
      attr(svg, "stroke", "currentColor");
      attr(svg, "stroke-width", "2");
      attr(svg, "stroke-linecap", "round");
      attr(svg, "stroke-linejoin", "round");
      attr(svg, "class", "svg-icon lucide-calendar");
    },
    m(target, anchor) {
      insert(target, svg, anchor);
      append(svg, rect);
      append(svg, line0);
      append(svg, line1);
      append(svg, line2);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(svg);
      }
    }
  };
}
class DateIcon extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment$6, safe_not_equal, {});
  }
}
function create_fragment$5(ctx) {
  let svg;
  let path0;
  let path1;
  let path2;
  let path3;
  let rect0;
  let rect1;
  return {
    c() {
      svg = svg_element("svg");
      path0 = svg_element("path");
      path1 = svg_element("path");
      path2 = svg_element("path");
      path3 = svg_element("path");
      rect0 = svg_element("rect");
      rect1 = svg_element("rect");
      attr(path0, "d", "M6 20h4");
      attr(path1, "d", "M14 10h4");
      attr(path2, "d", "M6 14h2v6");
      attr(path3, "d", "M14 4h2v6");
      attr(rect0, "x", "6");
      attr(rect0, "y", "4");
      attr(rect0, "width", "4");
      attr(rect0, "height", "6");
      attr(rect1, "x", "14");
      attr(rect1, "y", "14");
      attr(rect1, "width", "4");
      attr(rect1, "height", "6");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg, "width", "24");
      attr(svg, "height", "24");
      attr(svg, "viewBox", "0 0 24 24");
      attr(svg, "fill", "none");
      attr(svg, "stroke", "currentColor");
      attr(svg, "stroke-width", "2");
      attr(svg, "stroke-linecap", "round");
      attr(svg, "stroke-linejoin", "round");
      attr(svg, "class", "svg-icon lucide-binary");
    },
    m(target, anchor) {
      insert(target, svg, anchor);
      append(svg, path0);
      append(svg, path1);
      append(svg, path2);
      append(svg, path3);
      append(svg, rect0);
      append(svg, rect1);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(svg);
      }
    }
  };
}
class NumberIcon extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment$5, safe_not_equal, {});
  }
}
function create_if_block_2(ctx) {
  let numbericon;
  let current;
  numbericon = new NumberIcon({});
  return {
    c() {
      create_component(numbericon.$$.fragment);
    },
    m(target, anchor) {
      mount_component(numbericon, target, anchor);
      current = true;
    },
    i(local) {
      if (current)
        return;
      transition_in(numbericon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(numbericon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(numbericon, detaching);
    }
  };
}
function create_if_block_1(ctx) {
  let dateicon;
  let current;
  dateicon = new DateIcon({});
  return {
    c() {
      create_component(dateicon.$$.fragment);
    },
    m(target, anchor) {
      mount_component(dateicon, target, anchor);
      current = true;
    },
    i(local) {
      if (current)
        return;
      transition_in(dateicon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(dateicon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(dateicon, detaching);
    }
  };
}
function create_if_block(ctx) {
  let datetimeicon;
  let current;
  datetimeicon = new DateTimeIcon({});
  return {
    c() {
      create_component(datetimeicon.$$.fragment);
    },
    m(target, anchor) {
      mount_component(datetimeicon, target, anchor);
      current = true;
    },
    i(local) {
      if (current)
        return;
      transition_in(datetimeicon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(datetimeicon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(datetimeicon, detaching);
    }
  };
}
function create_fragment$4(ctx) {
  let div3;
  let div0;
  let span;
  let current_block_type_index;
  let if_block;
  let t0;
  let div2;
  let div1;
  let t1;
  let current;
  let mounted;
  let dispose;
  const if_block_creators = [create_if_block, create_if_block_1, create_if_block_2];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*type*/
      ctx2[3] === "datetime"
    )
      return 0;
    if (
      /*type*/
      ctx2[3] === "date"
    )
      return 1;
    if (
      /*type*/
      ctx2[3] === "number"
    )
      return 2;
    return -1;
  }
  if (~(current_block_type_index = select_block_type(ctx))) {
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  }
  return {
    c() {
      div3 = element("div");
      div0 = element("div");
      span = element("span");
      if (if_block)
        if_block.c();
      t0 = space();
      div2 = element("div");
      div1 = element("div");
      t1 = text(
        /*name*/
        ctx[2]
      );
      attr(span, "class", "suggestion-flair");
      attr(div0, "class", "suggestion-icon");
      attr(div1, "class", "suggestion-title");
      attr(div2, "class", "suggestion-content");
      attr(div3, "class", "suggestion-item mod-complex");
      attr(
        div3,
        "aria-selected",
        /*selected*/
        ctx[0]
      );
      attr(div3, "role", "option");
      attr(
        div3,
        "tabindex",
        /*index*/
        ctx[1]
      );
      toggle_class(
        div3,
        "is-selected",
        /*selected*/
        ctx[0]
      );
    },
    m(target, anchor) {
      insert(target, div3, anchor);
      append(div3, div0);
      append(div0, span);
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].m(span, null);
      }
      append(div3, t0);
      append(div3, div2);
      append(div2, div1);
      append(div1, t1);
      current = true;
      if (!mounted) {
        dispose = [
          listen(
            div3,
            "mouseenter",
            /*mouseenter_handler*/
            ctx[5]
          ),
          listen(
            div3,
            "focusin",
            /*focusin_handler*/
            ctx[6]
          ),
          listen(
            div3,
            "click",
            /*click_handler*/
            ctx[7]
          ),
          listen(
            div3,
            "keydown",
            /*keydown_handler*/
            ctx[8]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index !== previous_block_index) {
        if (if_block) {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
        }
        if (~current_block_type_index) {
          if_block = if_blocks[current_block_type_index];
          if (!if_block) {
            if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block.c();
          }
          transition_in(if_block, 1);
          if_block.m(span, null);
        } else {
          if_block = null;
        }
      }
      if (!current || dirty & /*name*/
      4)
        set_data(
          t1,
          /*name*/
          ctx2[2]
        );
      if (!current || dirty & /*selected*/
      1) {
        attr(
          div3,
          "aria-selected",
          /*selected*/
          ctx2[0]
        );
      }
      if (!current || dirty & /*index*/
      2) {
        attr(
          div3,
          "tabindex",
          /*index*/
          ctx2[1]
        );
      }
      if (!current || dirty & /*selected*/
      1) {
        toggle_class(
          div3,
          "is-selected",
          /*selected*/
          ctx2[0]
        );
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div3);
      }
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].d();
      }
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$4($$self, $$props, $$invalidate) {
  const dispatch2 = createEventDispatcher();
  let { selected } = $$props;
  let { index } = $$props;
  let { name } = $$props;
  let { type } = $$props;
  const mouseenter_handler = () => dispatch2("consider", index);
  const focusin_handler = () => dispatch2("consider", index);
  const click_handler = () => dispatch2("select", index);
  const keydown_handler = (e) => e.key === "Enter" ? dispatch2("select", index) : null;
  $$self.$$set = ($$props2) => {
    if ("selected" in $$props2)
      $$invalidate(0, selected = $$props2.selected);
    if ("index" in $$props2)
      $$invalidate(1, index = $$props2.index);
    if ("name" in $$props2)
      $$invalidate(2, name = $$props2.name);
    if ("type" in $$props2)
      $$invalidate(3, type = $$props2.type);
  };
  return [
    selected,
    index,
    name,
    type,
    dispatch2,
    mouseenter_handler,
    focusin_handler,
    click_handler,
    keydown_handler
  ];
}
class PropertySelectionOption extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$4, create_fragment$4, safe_not_equal, { selected: 0, index: 1, name: 2, type: 3 });
  }
}
const TIMELINE_PROPERTY_TYPES = Object.freeze([
  "number",
  "date",
  "datetime"
]);
function isTimelinePropertyType(type) {
  return TIMELINE_PROPERTY_TYPES.includes(type);
}
const PropertySelection_svelte_svelte_type_style_lang = "";
function create_item_slot(ctx) {
  let propertyselectionoption;
  let current;
  propertyselectionoption = new PropertySelectionOption({
    props: {
      slot: "item",
      index: (
        /*index*/
        ctx[18]
      ),
      selected: (
        /*selectedIndex*/
        ctx[1] === /*index*/
        ctx[18] || /*consideredIndex*/
        ctx[0] === /*index*/
        ctx[18]
      ),
      name: (
        /*propertyNames*/
        ctx[3][
          /*index*/
          ctx[18]
        ]
      ),
      type: (
        /*typeOf*/
        ctx[7](
          /*index*/
          ctx[18]
        )
      )
    }
  });
  propertyselectionoption.$on(
    "select",
    /*onSelect*/
    ctx[5]
  );
  propertyselectionoption.$on(
    "consider",
    /*consider*/
    ctx[6]
  );
  return {
    c() {
      create_component(propertyselectionoption.$$.fragment);
    },
    m(target, anchor) {
      mount_component(propertyselectionoption, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const propertyselectionoption_changes = {};
      if (dirty & /*index*/
      262144)
        propertyselectionoption_changes.index = /*index*/
        ctx2[18];
      if (dirty & /*selectedIndex, index, consideredIndex*/
      262147)
        propertyselectionoption_changes.selected = /*selectedIndex*/
        ctx2[1] === /*index*/
        ctx2[18] || /*consideredIndex*/
        ctx2[0] === /*index*/
        ctx2[18];
      if (dirty & /*propertyNames, index*/
      262152)
        propertyselectionoption_changes.name = /*propertyNames*/
        ctx2[3][
          /*index*/
          ctx2[18]
        ];
      if (dirty & /*index*/
      262144)
        propertyselectionoption_changes.type = /*typeOf*/
        ctx2[7](
          /*index*/
          ctx2[18]
        );
      propertyselectionoption.$set(propertyselectionoption_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(propertyselectionoption.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(propertyselectionoption.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(propertyselectionoption, detaching);
    }
  };
}
function create_fragment$3(ctx) {
  let select_1;
  let current;
  let select_1_props = {
    class: "timeline-property-select",
    selectedIndex: (
      /*selectedIndex*/
      ctx[1]
    ),
    itemCount: (
      /*propertyCount*/
      ctx[4]
    ),
    $$slots: {
      item: [
        create_item_slot,
        ({ index }) => ({ 18: index }),
        ({ index }) => index ? 262144 : 0
      ]
    },
    $$scope: { ctx }
  };
  select_1 = new Select({ props: select_1_props });
  ctx[12](select_1);
  select_1.$on(
    "change",
    /*onSelect*/
    ctx[5]
  );
  select_1.$on(
    "showing",
    /*showing_handler*/
    ctx[13]
  );
  select_1.$on(
    "shown",
    /*shown_handler*/
    ctx[14]
  );
  return {
    c() {
      create_component(select_1.$$.fragment);
    },
    m(target, anchor) {
      mount_component(select_1, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const select_1_changes = {};
      if (dirty & /*selectedIndex*/
      2)
        select_1_changes.selectedIndex = /*selectedIndex*/
        ctx2[1];
      if (dirty & /*propertyCount*/
      16)
        select_1_changes.itemCount = /*propertyCount*/
        ctx2[4];
      if (dirty & /*$$scope, index, selectedIndex, consideredIndex, propertyNames*/
      786443) {
        select_1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      select_1.$set(select_1_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(select_1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(select_1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      ctx[12](null);
      destroy_component(select_1, detaching);
    }
  };
}
function instance$3($$self, $$props, $$invalidate) {
  let propertyNames;
  let propertyCount;
  const alwaysAvailableProperties = [NoteProperty.Created, NoteProperty.Modified];
  let { properties } = $$props;
  let { selectedProperty } = $$props;
  const dispatch2 = createEventDispatcher();
  let availableProperties = alwaysAvailableProperties;
  let consideredIndex = -1;
  let selectedIndex = -1;
  let selectView;
  function select(index, event) {
    $$invalidate(9, selectedProperty = propertyNames[index]);
    $$invalidate(1, selectedIndex = index);
    $$invalidate(0, consideredIndex = -1);
    if (selectView != null && (event == null ? void 0 : event.type) !== "change") {
      selectView.hide(event);
    }
    dispatch2("selected", availableProperties[selectedIndex]);
  }
  function onSelect(event) {
    select(event.detail, event);
  }
  function consider(event) {
    $$invalidate(0, consideredIndex = event.detail);
  }
  function typeOf(index) {
    return availableProperties[index].type();
  }
  async function getPropertyList() {
    const propertyList = await properties.listPropertiesOfTypes(TIMELINE_PROPERTY_TYPES);
    $$invalidate(11, availableProperties = propertyList);
    $$invalidate(1, selectedIndex = propertyList.findIndex((property) => property.name() === selectedProperty));
    if (selectedIndex === -1) {
      select(0);
    }
  }
  onMount(() => {
    getPropertyList();
  });
  function select_1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      selectView = $$value;
      $$invalidate(2, selectView);
    });
  }
  const showing_handler = () => {
    getPropertyList();
  };
  const shown_handler = () => {
    var _a, _b;
    (_b = (_a = selectView == null ? void 0 : selectView.getDialog()) == null ? void 0 : _a.classList) == null ? void 0 : _b.add("timeline-property-select-popup");
  };
  $$self.$$set = ($$props2) => {
    if ("properties" in $$props2)
      $$invalidate(10, properties = $$props2.properties);
    if ("selectedProperty" in $$props2)
      $$invalidate(9, selectedProperty = $$props2.selectedProperty);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*availableProperties*/
    2048) {
      $$invalidate(3, propertyNames = availableProperties.map((it) => it.name()));
    }
    if ($$self.$$.dirty & /*availableProperties*/
    2048) {
      $$invalidate(4, propertyCount = availableProperties.length);
    }
  };
  return [
    consideredIndex,
    selectedIndex,
    selectView,
    propertyNames,
    propertyCount,
    onSelect,
    consider,
    typeOf,
    getPropertyList,
    selectedProperty,
    properties,
    availableProperties,
    select_1_binding,
    showing_handler,
    shown_handler
  ];
}
class PropertySelection extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$3, create_fragment$3, safe_not_equal, { properties: 10, selectedProperty: 9 });
  }
}
function create_default_slot$1(ctx) {
  let propertyselection;
  let updating_selectedProperty;
  let current;
  function propertyselection_selectedProperty_binding(value) {
    ctx[7](value);
  }
  let propertyselection_props = { properties: (
    /*properties*/
    ctx[0]
  ) };
  if (
    /*$property*/
    ctx[2] !== void 0
  ) {
    propertyselection_props.selectedProperty = /*$property*/
    ctx[2];
  }
  propertyselection = new PropertySelection({ props: propertyselection_props });
  binding_callbacks.push(() => bind(propertyselection, "selectedProperty", propertyselection_selectedProperty_binding));
  propertyselection.$on(
    "selected",
    /*selected_handler*/
    ctx[8]
  );
  return {
    c() {
      create_component(propertyselection.$$.fragment);
    },
    m(target, anchor) {
      mount_component(propertyselection, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const propertyselection_changes = {};
      if (dirty & /*properties*/
      1)
        propertyselection_changes.properties = /*properties*/
        ctx2[0];
      if (!updating_selectedProperty && dirty & /*$property*/
      4) {
        updating_selectedProperty = true;
        propertyselection_changes.selectedProperty = /*$property*/
        ctx2[2];
        add_flush_callback(() => updating_selectedProperty = false);
      }
      propertyselection.$set(propertyselection_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(propertyselection.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(propertyselection.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(propertyselection, detaching);
    }
  };
}
function create_fragment$2(ctx) {
  let collapsablesection;
  let updating_collapsed;
  let current;
  function collapsablesection_collapsed_binding(value) {
    ctx[9](value);
  }
  let collapsablesection_props = {
    name: "Property",
    $$slots: { default: [create_default_slot$1] },
    $$scope: { ctx }
  };
  if (
    /*$collapsed*/
    ctx[1] !== void 0
  ) {
    collapsablesection_props.collapsed = /*$collapsed*/
    ctx[1];
  }
  collapsablesection = new CollapsableSection({ props: collapsablesection_props });
  binding_callbacks.push(() => bind(collapsablesection, "collapsed", collapsablesection_collapsed_binding));
  return {
    c() {
      create_component(collapsablesection.$$.fragment);
    },
    m(target, anchor) {
      mount_component(collapsablesection, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const collapsablesection_changes = {};
      if (dirty & /*$$scope, properties, $property*/
      1029) {
        collapsablesection_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_collapsed && dirty & /*$collapsed*/
      2) {
        updating_collapsed = true;
        collapsablesection_changes.collapsed = /*$collapsed*/
        ctx2[1];
        add_flush_callback(() => updating_collapsed = false);
      }
      collapsablesection.$set(collapsablesection_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(collapsablesection.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(collapsablesection.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(collapsablesection, detaching);
    }
  };
}
function instance$2($$self, $$props, $$invalidate) {
  let $collapsed;
  let $property;
  let { viewModel } = $$props;
  let { properties } = $$props;
  const collapsed = viewModel.make("collapsed", true);
  component_subscribe($$self, collapsed, (value) => $$invalidate(1, $collapsed = value));
  const property = viewModel.make("property", "created");
  component_subscribe($$self, property, (value) => $$invalidate(2, $property = value));
  const dispatch2 = createEventDispatcher();
  function propertyselection_selectedProperty_binding(value) {
    $property = value;
    property.set($property);
  }
  const selected_handler = (event) => dispatch2("propertySelected", event.detail);
  function collapsablesection_collapsed_binding(value) {
    $collapsed = value;
    collapsed.set($collapsed);
  }
  $$self.$$set = ($$props2) => {
    if ("viewModel" in $$props2)
      $$invalidate(6, viewModel = $$props2.viewModel);
    if ("properties" in $$props2)
      $$invalidate(0, properties = $$props2.properties);
  };
  return [
    properties,
    $collapsed,
    $property,
    collapsed,
    property,
    dispatch2,
    viewModel,
    propertyselection_selectedProperty_binding,
    selected_handler,
    collapsablesection_collapsed_binding
  ];
}
class TimelinePropertySetting extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$2, safe_not_equal, { viewModel: 6, properties: 0 });
  }
}
function create_default_slot(ctx) {
  let div;
  let input;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      input = element("input");
      attr(input, "type", "search");
      attr(input, "enterkeyhint", "search");
      attr(input, "spellcheck", "false");
      attr(input, "placeholder", "Search files...");
      attr(div, "class", "search-input-container");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, input);
      set_input_value(
        input,
        /*$query*/
        ctx[1]
      );
      if (!mounted) {
        dispose = listen(
          input,
          "input",
          /*input_input_handler*/
          ctx[5]
        );
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty & /*$query*/
      2 && input.value !== /*$query*/
      ctx2[1]) {
        set_input_value(
          input,
          /*$query*/
          ctx2[1]
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_fragment$1(ctx) {
  let collapsablesection;
  let updating_collapsed;
  let current;
  function collapsablesection_collapsed_binding(value) {
    ctx[6](value);
  }
  let collapsablesection_props = {
    name: "Filter",
    $$slots: { default: [create_default_slot] },
    $$scope: { ctx }
  };
  if (
    /*$collapsed*/
    ctx[0] !== void 0
  ) {
    collapsablesection_props.collapsed = /*$collapsed*/
    ctx[0];
  }
  collapsablesection = new CollapsableSection({ props: collapsablesection_props });
  binding_callbacks.push(() => bind(collapsablesection, "collapsed", collapsablesection_collapsed_binding));
  return {
    c() {
      create_component(collapsablesection.$$.fragment);
    },
    m(target, anchor) {
      mount_component(collapsablesection, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const collapsablesection_changes = {};
      if (dirty & /*$$scope, $query*/
      130) {
        collapsablesection_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_collapsed && dirty & /*$collapsed*/
      1) {
        updating_collapsed = true;
        collapsablesection_changes.collapsed = /*$collapsed*/
        ctx2[0];
        add_flush_callback(() => updating_collapsed = false);
      }
      collapsablesection.$set(collapsablesection_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(collapsablesection.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(collapsablesection.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(collapsablesection, detaching);
    }
  };
}
function instance$1($$self, $$props, $$invalidate) {
  let $collapsed;
  let $query;
  let { viewModel } = $$props;
  const collapsed = viewModel.make("collapsed", true);
  component_subscribe($$self, collapsed, (value) => $$invalidate(0, $collapsed = value));
  const query = viewModel.make("query", "");
  component_subscribe($$self, query, (value) => $$invalidate(1, $query = value));
  function input_input_handler() {
    $query = this.value;
    query.set($query);
  }
  function collapsablesection_collapsed_binding(value) {
    $collapsed = value;
    collapsed.set($collapsed);
  }
  $$self.$$set = ($$props2) => {
    if ("viewModel" in $$props2)
      $$invalidate(4, viewModel = $$props2.viewModel);
  };
  return [
    $collapsed,
    $query,
    collapsed,
    query,
    viewModel,
    input_input_handler,
    collapsablesection_collapsed_binding
  ];
}
class TimelineFilterSetting extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, { viewModel: 4 });
  }
}
function getPropertyDisplayType(property) {
  const type = property.type().toLocaleLowerCase();
  if (type === "date" || type === "datetime") {
    return "date";
  }
  return "numeric";
}
const NoteTimeline_svelte_svelte_type_style_lang = "";
function create_additional_settings_slot(ctx) {
  let timelinepropertysetting;
  let t0;
  let timelinefiltersetting;
  let t1;
  let groups;
  let current;
  timelinepropertysetting = new TimelinePropertySetting({
    props: {
      viewModel: (
        /*settings*/
        ctx[8].namespace("property")
      ),
      properties: (
        /*notePropertyRepository*/
        ctx[2]
      )
    }
  });
  timelinepropertysetting.$on(
    "propertySelected",
    /*propertySelected_handler*/
    ctx[22]
  );
  timelinefiltersetting = new TimelineFilterSetting({
    props: {
      viewModel: (
        /*settings*/
        ctx[8].namespace("filter")
      )
    }
  });
  let groups_props = {
    timelineItemGroups: (
      /*timelineItemGroups*/
      ctx[11]
    ),
    name: "Groups",
    viewModel: (
      /*settings*/
      ctx[8].namespace("groups")
    )
  };
  groups = new Groups({ props: groups_props });
  ctx[23](groups);
  return {
    c() {
      create_component(timelinepropertysetting.$$.fragment);
      t0 = space();
      create_component(timelinefiltersetting.$$.fragment);
      t1 = space();
      create_component(groups.$$.fragment);
    },
    m(target, anchor) {
      mount_component(timelinepropertysetting, target, anchor);
      insert(target, t0, anchor);
      mount_component(timelinefiltersetting, target, anchor);
      insert(target, t1, anchor);
      mount_component(groups, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const timelinepropertysetting_changes = {};
      if (dirty[0] & /*notePropertyRepository*/
      4)
        timelinepropertysetting_changes.properties = /*notePropertyRepository*/
        ctx2[2];
      timelinepropertysetting.$set(timelinepropertysetting_changes);
      const groups_changes = {};
      groups.$set(groups_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(timelinepropertysetting.$$.fragment, local);
      transition_in(timelinefiltersetting.$$.fragment, local);
      transition_in(groups.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(timelinepropertysetting.$$.fragment, local);
      transition_out(timelinefiltersetting.$$.fragment, local);
      transition_out(groups.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t0);
        detach(t1);
      }
      destroy_component(timelinepropertysetting, detaching);
      destroy_component(timelinefiltersetting, detaching);
      ctx[23](null);
      destroy_component(groups, detaching);
    }
  };
}
function create_fragment(ctx) {
  let timelineview;
  let current;
  let timelineview_props = {
    items: (
      /*items*/
      ctx[3]
    ),
    namespacedWritable: (
      /*viewModel*/
      ctx[1]
    ),
    displayPropertyAs: (
      /*displayItemsAs*/
      ctx[6]
    ),
    $$slots: {
      "additional-settings": [create_additional_settings_slot]
    },
    $$scope: { ctx }
  };
  timelineview = new Timeline({ props: timelineview_props });
  ctx[24](timelineview);
  timelineview.$on(
    "select",
    /*select_handler*/
    ctx[25]
  );
  timelineview.$on(
    "focus",
    /*focus_handler*/
    ctx[26]
  );
  return {
    c() {
      create_component(timelineview.$$.fragment);
    },
    m(target, anchor) {
      mount_component(timelineview, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const timelineview_changes = {};
      if (dirty[0] & /*items*/
      8)
        timelineview_changes.items = /*items*/
        ctx2[3];
      if (dirty[0] & /*viewModel*/
      2)
        timelineview_changes.namespacedWritable = /*viewModel*/
        ctx2[1];
      if (dirty[0] & /*displayItemsAs*/
      64)
        timelineview_changes.displayPropertyAs = /*displayItemsAs*/
        ctx2[6];
      if (dirty[0] & /*groupsView, notePropertyRepository*/
      20 | dirty[1] & /*$$scope*/
      16) {
        timelineview_changes.$$scope = { dirty, ctx: ctx2 };
      }
      timelineview.$set(timelineview_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(timelineview.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(timelineview.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      ctx[24](null);
      destroy_component(timelineview, detaching);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let $activeFilter;
  let $filterText;
  let { notes } = $$props;
  let { noteRepository } = $$props;
  let { propertySelection } = $$props;
  let { viewModel } = $$props;
  let { isNew = false } = $$props;
  let { notePropertyRepository } = $$props;
  const dispatch2 = createEventDispatcher();
  const settings = viewModel.namespace("settings");
  let filterSection = settings.namespace("filter");
  const filterText = filterSection.make("query", "");
  component_subscribe($$self, filterText, (value) => $$invalidate(30, $filterText = value));
  const activeFilter = writable(noteRepository.getInclusiveNoteFilterForQuery($filterText));
  component_subscribe($$self, activeFilter, (value) => $$invalidate(29, $activeFilter = value));
  filterText.subscribe((newFilterText) => activeFilter.set(noteRepository.getInclusiveNoteFilterForQuery(newFilterText)));
  let items = [];
  const groupsNamespace = settings.namespace("groups");
  const groupsRepo = new GroupRepository(groupsNamespace.make("groups", []), noteRepository);
  let groupsView;
  const timelineItemGroups = makeTimelineItemGroups(
    {
      groups: groupsRepo,
      items: {
        list() {
          return items;
        }
      },
      recolorProcess: void 0
    },
    {
      presentNewGroup(group2) {
        groupsView == null ? void 0 : groupsView.addGroup(group2);
      },
      presentReorderedGroups(groups) {
        groupsView == null ? void 0 : groupsView.newOrder(groups);
      },
      presentRecoloredGroup(group2) {
        groupsView == null ? void 0 : groupsView.recolorGroup(group2);
      },
      presentRecoloredItem(item) {
        timelineView == null ? void 0 : timelineView.invalidateColors();
      },
      presentRecoloredItems(items2) {
        timelineView == null ? void 0 : timelineView.invalidateColors();
      },
      presentRequeriedGroup(group2) {
        groupsView == null ? void 0 : groupsView.changeGroupQuery(group2);
      },
      hideGroup(groupId) {
        groupsView == null ? void 0 : groupsView.removeGroup(groupId);
      }
    }
  );
  function openFile(event, item) {
    var _a;
    const note = (_a = notes.get(item.id())) == null ? void 0 : _a.obsidianFile;
    if (note == null) {
      return;
    }
    dispatch2("noteSelected", { note, event });
  }
  let timelineView;
  let displayItemsAs = "date";
  onMount(async () => {
    $$invalidate(3, items = (await Promise.all(Array.from(notes.values()).map(async (item) => {
      if (await $activeFilter.matches(item.obsidianFile)) {
        return item;
      }
    }))).filter((item) => !!item));
    const orderPropertyName = get_store_value(viewModel.namespace("settings").namespace("property").make("property", "created"));
    let orderProperty = await notePropertyRepository.getPropertyByName(orderPropertyName);
    if (!orderProperty || !isTimelinePropertyType(orderProperty.type())) {
      orderProperty = NoteProperty.Created;
    }
    $$invalidate(14, propertySelection.selector = getPropertySelector(orderProperty), propertySelection);
    $$invalidate(6, displayItemsAs = getPropertyDisplayType(orderProperty));
    for (const item of items) {
      item._invalidateValueCache();
    }
    $$invalidate(3, items);
    const groups = timelineItemGroups.listGroups();
    if (groups.length > 0) {
      timelineItemGroups.applyFileToGroup(groups[0].id, groups[0].query);
    }
    let currentFilteringId = 0;
    activeFilter.subscribe(async (newFilter) => {
      const filteringId = currentFilteringId + 1;
      currentFilteringId = filteringId;
      const newItems = [];
      for (const item of Array.from(notes.values())) {
        if (currentFilteringId !== filteringId)
          break;
        if (await newFilter.matches(item.obsidianFile)) {
          newItems.push(item);
        }
      }
      $$invalidate(3, items = newItems);
    });
    if (isNew) {
      timelineView.zoomToFit(items);
    }
  });
  let groupUpdates = [];
  let itemUpdateTimeout;
  function scheduleItemUpdate() {
    if (itemUpdateTimeout != null)
      return;
    itemUpdateTimeout = setTimeout(
      async () => {
        itemUpdateTimeout = void 0;
        if (groupUpdates.length > 0) {
          const groups = groupsRepo.list();
          for (const item of groupUpdates) {
            item._invalidateValueCache();
            const group2 = await selectGroupForFile(groups, item.obsidianFile);
            item.applyGroup(group2);
          }
          groupUpdates = [];
        }
        timelineView == null ? void 0 : timelineView.refresh();
      },
      250
    );
  }
  async function addFile(file) {
    if (timelineView == null)
      return;
    const item = new TimelineFileItem(file, propertySelection);
    notes.set(file.id(), item);
    if (await $activeFilter.matches(file)) {
      items.push(item);
      scheduleItemUpdate();
    }
  }
  function deleteFile(file) {
    if (timelineView == null)
      return;
    const item = notes.get(file.id());
    if (item == null)
      return;
    if (notes.delete(file.id())) {
      items.remove(item);
      scheduleItemUpdate();
    }
  }
  async function modifyFile(file) {
    if (timelineView == null)
      return;
    const item = notes.get(file.id());
    if (item == null)
      return;
    groupUpdates.push(item);
    scheduleItemUpdate();
  }
  async function renameFile(file, oldPath) {
    if (timelineView == null)
      return;
    const item = notes.get(oldPath);
    if (item == null)
      return;
    notes.delete(oldPath);
    notes.set(file.id(), item);
    groupUpdates.push(item);
    scheduleItemUpdate();
  }
  function focusOnNote(note) {
    const item = notes.get(note.id());
    if (item == null)
      return;
    timelineView == null ? void 0 : timelineView.focusOnItem(item);
  }
  function onPropertySelected(property) {
    if (timelineView == null)
      return;
    $$invalidate(14, propertySelection.selector = getPropertySelector(property), propertySelection);
    for (const item of items) {
      item._invalidateValueCache();
    }
    $$invalidate(3, items);
    timelineView.zoomToFit(items);
    $$invalidate(6, displayItemsAs = getPropertyDisplayType(property));
  }
  const propertySelected_handler = (event) => onPropertySelected(event.detail);
  function groups_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      groupsView = $$value;
      $$invalidate(4, groupsView);
    });
  }
  function timelineview_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      timelineView = $$value;
      $$invalidate(5, timelineView);
    });
  }
  const select_handler = (e) => openFile(e.detail.causedBy, e.detail.item);
  const focus_handler = (e) => dispatch2("noteFocused", notes.get(e.detail.id()));
  $$self.$$set = ($$props2) => {
    if ("notes" in $$props2)
      $$invalidate(0, notes = $$props2.notes);
    if ("noteRepository" in $$props2)
      $$invalidate(15, noteRepository = $$props2.noteRepository);
    if ("propertySelection" in $$props2)
      $$invalidate(14, propertySelection = $$props2.propertySelection);
    if ("viewModel" in $$props2)
      $$invalidate(1, viewModel = $$props2.viewModel);
    if ("isNew" in $$props2)
      $$invalidate(16, isNew = $$props2.isNew);
    if ("notePropertyRepository" in $$props2)
      $$invalidate(2, notePropertyRepository = $$props2.notePropertyRepository);
  };
  return [
    notes,
    viewModel,
    notePropertyRepository,
    items,
    groupsView,
    timelineView,
    displayItemsAs,
    dispatch2,
    settings,
    filterText,
    activeFilter,
    timelineItemGroups,
    openFile,
    onPropertySelected,
    propertySelection,
    noteRepository,
    isNew,
    addFile,
    deleteFile,
    modifyFile,
    renameFile,
    focusOnNote,
    propertySelected_handler,
    groups_binding,
    timelineview_binding,
    select_handler,
    focus_handler
  ];
}
class NoteTimeline extends SvelteComponent {
  constructor(options) {
    super();
    init(
      this,
      options,
      instance,
      create_fragment,
      safe_not_equal,
      {
        notes: 0,
        noteRepository: 15,
        propertySelection: 14,
        viewModel: 1,
        isNew: 16,
        notePropertyRepository: 2,
        addFile: 17,
        deleteFile: 18,
        modifyFile: 19,
        renameFile: 20,
        focusOnNote: 21
      },
      null,
      [-1, -1]
    );
  }
  get addFile() {
    return this.$$.ctx[17];
  }
  get deleteFile() {
    return this.$$.ctx[18];
  }
  get modifyFile() {
    return this.$$.ctx[19];
  }
  get renameFile() {
    return this.$$.ctx[20];
  }
  get focusOnNote() {
    return this.$$.ctx[21];
  }
}
function workspaceLeafExt(leaf) {
  if ("updateHeader" in leaf && typeof leaf.updateHeader === "function" && leaf.updateHeader != null) {
    return leaf;
  }
  return null;
}
function titleEl(itemView) {
  if (!itemView.titleEl) {
    return void 0;
  }
  return itemView.titleEl;
}
const OBSIDIAN_LEAF_VIEW_TYPE = "VIEW_TYPE_TIMELINE_VIEW";
const LUCID_ICON = "waypoints";
class ObsidianTimelinePlugin extends obsidian.Plugin {
  async onload() {
    const notes = new ObsidianNoteRepository(
      this.app.vault,
      this.app.metadataCache
    );
    const properties = new ObsidianNotePropertyRepository(
      this.app.vault.adapter,
      () => getMetadataTypeManager(this.app)
    );
    const openTimelineView = async (leaf, group2) => {
      const timeline = await createNewTimeline(
        notes,
        NoteProperty.Created
      );
      leaf.setViewState({
        type: OBSIDIAN_LEAF_VIEW_TYPE,
        active: true,
        state: {
          focalValue: timeline.focalValue,
          isNew: true
        },
        group: group2
      });
    };
    const openTimelineViewInNewLeaf = () => {
      openTimelineView(this.app.workspace.getLeaf(true));
    };
    this.registerView(OBSIDIAN_LEAF_VIEW_TYPE, (leaf) => {
      const view = new TimelineItemView(
        leaf,
        this.app.vault,
        this.app.metadataCache,
        this.app.workspace,
        notes,
        properties
      );
      return view;
    });
    this.addRibbonIcon(
      LUCID_ICON,
      "Open timeline view",
      () => openTimelineViewInNewLeaf()
    );
    this.addCommand({
      id: "open-timeline-view",
      name: "Open timeline view",
      callback: () => openTimelineViewInNewLeaf(),
      icon: LUCID_ICON
    });
    this.registerEvent(
      this.app.workspace.on("file-menu", (menu, editor, info) => {
        menu.addItem((item) => {
          item.setSection("view.linked");
          item.setTitle("Open timeline view");
          item.setIcon(LUCID_ICON);
          item.onClick(() => {
            var _a;
            openTimelineView(
              this.app.workspace.getLeaf("split", "horizontal"),
              (_a = this.app.workspace.getMostRecentLeaf()) != null ? _a : void 0
            );
          });
        });
      })
    );
  }
  onunload() {
    this.app.workspace.detachLeavesOfType(OBSIDIAN_LEAF_VIEW_TYPE);
  }
}
class TimelineItemView extends obsidian.ItemView {
  constructor(leaf, vault, metadata, workspace, notes, noteProperties) {
    super(leaf);
    __publicField(this, "group");
    __privateAdd(this, _displayText, this.computeDisplayText());
    __publicField(this, "component", null);
    __publicField(this, "initialization");
    __publicField(this, "state");
    this.workspace = workspace;
    this.notes = notes;
    this.noteProperties = noteProperties;
    this.navigation = false;
    this.initialization = new Promise((resolve) => {
      this.completeInitialization = resolve;
    });
    this.registerEvent(
      vault.on("create", (file) => {
        var _a;
        if (file instanceof obsidian.TFile) {
          (_a = this.component) == null ? void 0 : _a.addFile(this.notes.getNoteForFile(file));
        }
      })
    );
    this.registerEvent(
      vault.on("rename", (file, oldPath) => {
        var _a;
        if (file instanceof obsidian.TFile) {
          (_a = this.component) == null ? void 0 : _a.renameFile(
            this.notes.getNoteForFile(file),
            oldPath
          );
        }
      })
    );
    this.registerEvent(
      vault.on("modify", (file) => {
        var _a;
        if (file instanceof obsidian.TFile) {
          (_a = this.component) == null ? void 0 : _a.modifyFile(this.notes.getNoteForFile(file));
        }
      })
    );
    this.registerEvent(
      metadata.on("changed", (file) => {
        var _a;
        if (file instanceof obsidian.TFile) {
          (_a = this.component) == null ? void 0 : _a.modifyFile(this.notes.getNoteForFile(file));
        }
      })
    );
    this.registerEvent(
      vault.on("delete", (file) => {
        var _a;
        if (file instanceof obsidian.TFile) {
          (_a = this.component) == null ? void 0 : _a.deleteFile(this.notes.getNoteForFile(file));
        }
      })
    );
    this.registerEvent(
      this.leaf.on("group-change", (group2) => {
        this.group = group2;
      })
    );
    const openFile = this.leaf.openFile.bind(this.leaf);
    this.leaf.openFile = async (file, openState) => {
      if (!this.group) {
        openFile(file, openState);
        return;
      }
      const leavesInGroup = this.workspace.getGroupLeaves(this.group);
      if (leavesInGroup.length === 1) {
        openFile(file, openState);
        return;
      }
    };
    this.registerEvent(
      this.workspace.on("active-leaf-change", (activeLeaf) => {
        var _a;
        if (activeLeaf === this.leaf || !activeLeaf) {
          return;
        }
        if (!this.group) {
          return;
        }
        const state = activeLeaf.getViewState().state;
        if (!state) {
          return;
        }
        if (!("file" in state) || typeof state.file !== "string") {
          return;
        }
        const leavesInGroup = this.workspace.getGroupLeaves(this.group);
        if (!leavesInGroup.includes(activeLeaf)) {
          return;
        }
        const file = vault.getAbstractFileByPath(state.file);
        if (file instanceof obsidian.TFile) {
          const note = this.notes.getNoteForFile(file);
          if (!note) {
            return;
          }
          (_a = this.component) == null ? void 0 : _a.focusOnNote(note);
        }
      })
    );
  }
  getIcon() {
    return LUCID_ICON;
  }
  getViewType() {
    return OBSIDIAN_LEAF_VIEW_TYPE;
  }
  onPaneMenu(menu, source) {
    menu.addItem((item) => {
      item.setIcon("link").setSection("view.linked").setTitle("Open linked markdown tab").onClick(() => {
        this.workspace.getLeaf("split", "horizontal").setViewState({
          type: "empty",
          group: this.leaf
        });
      });
    });
    return super.onPaneMenu(menu, source);
  }
  openNoteInLinkedLeaf(note) {
    if (!this.group) {
      return;
    }
    const leavesInGroup = this.workspace.getGroupLeaves(this.group);
    if (leavesInGroup.length === 1) {
      return;
    }
    const file = this.notes.getFileFromNote(note);
    if (!file) {
      return;
    }
    leavesInGroup.forEach((leaf) => {
      if (leaf === this.leaf)
        return;
      leaf.openFile(file);
    });
  }
  computeDisplayText() {
    var _a, _b, _c, _d;
    const query = (_d = (_c = (_b = (_a = this.state) == null ? void 0 : _a.settings) == null ? void 0 : _b.filter) == null ? void 0 : _c.query) != null ? _d : "";
    if (query !== "") {
      return `Timeline view - ${query}`;
    }
    return "Timeline view";
  }
  get displayText() {
    return __privateGet(this, _displayText);
  }
  set displayText(value) {
    var _a, _b, _c;
    if (__privateGet(this, _displayText) !== value) {
      __privateSet(this, _displayText, value);
      (_b = (_a = titleEl(this)) == null ? void 0 : _a.setText) == null ? void 0 : _b.call(_a, value);
      (_c = workspaceLeafExt(this.leaf)) == null ? void 0 : _c.updateHeader();
    }
  }
  getDisplayText() {
    return this.displayText;
  }
  completeInitialization(_state) {
  }
  setState(state, result) {
    this.state = state;
    this.completeInitialization(this.state);
    return super.setState(state, result);
  }
  getState() {
    return this.state;
  }
  async onOpen() {
    var _a;
    const content = this.containerEl.children[1];
    content.createEl("progress");
    const propertySelection = {
      selector: NoPropertySelector,
      selectProperty(note) {
        return this.selector.selectProperty(note);
      }
    };
    const notes = /* @__PURE__ */ new Map();
    for (const note of await this.notes.listAll()) {
      notes.set(note.id(), new TimelineFileItem(note, propertySelection));
    }
    (_a = this.initialization) == null ? void 0 : _a.then((state) => {
      var _a2;
      delete this.initialization;
      content.empty();
      content.setAttribute(
        "style",
        "padding:0;position: relative;overflow-x:hidden;overflow-y:hidden"
      );
      const isNew = state.isNew;
      delete state.isNew;
      this.component = new NoteTimeline({
        target: content,
        props: {
          notes,
          noteRepository: this.notes,
          propertySelection,
          notePropertyRepository: this.noteProperties,
          isNew,
          viewModel: writableProperties(state, (key, newValue) => {
            state[key] = newValue;
            this.displayText = this.computeDisplayText();
            this.workspace.requestSaveLayout();
          })
        }
      });
      this.component.$on("noteSelected", (event) => {
        const file = this.notes.getFileFromNote(event.detail.note);
        if (!file)
          return;
        const cause = event.detail.event;
        let newLeaf;
        if (cause instanceof MouseEvent || cause instanceof KeyboardEvent) {
          newLeaf = this.workspace.getLeaf(obsidian.Keymap.isModEvent(cause));
        } else {
          newLeaf = this.workspace.getLeaf(true);
        }
        newLeaf.openFile(file);
      });
      (_a2 = this.component) == null ? void 0 : _a2.$on("noteFocused", (event) => {
        if (event.detail) {
          this.openNoteInLinkedLeaf(event.detail.obsidianFile);
        }
      });
    });
  }
  onClose() {
    var _a;
    this.leaf.openFile = obsidian.WorkspaceLeaf.prototype.openFile;
    (_a = this.component) == null ? void 0 : _a.$destroy();
    return super.onClose();
  }
}
_displayText = new WeakMap();
module.exports = ObsidianTimelinePlugin;
